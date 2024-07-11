import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip, TipDocument } from '../entities/tip.entity';
import {
  Technology,
  TechnologyDocument,
} from '../../../setUp/technology/entities/technology.entity';
import { Lang, LangDocument } from '../../../setUp/lang/entities/lang.entity';
import {
  Level,
  LevelDocument,
} from '../../../setUp/level/entities/level.entity';
import { CreateTipDto } from '../dto/create-tip.dto';
import { UpdateTipDto } from '../dto/update-tip.dto';
import {
  Subtechnology,
  SubtechnologyDocument,
} from '../../../setUp/subtechnology/entities/subtechnology.entity';

@Injectable()
export class TipsService {
  constructor(
    @InjectModel(Tip.name) private tipModel: Model<TipDocument>,
    @InjectModel(Technology.name)
    private technologyModel: Model<TechnologyDocument>,
    @InjectModel(Subtechnology.name)
    private subtechnologyModel: Model<SubtechnologyDocument>,
    @InjectModel(Lang.name) private langModel: Model<LangDocument>,
    @InjectModel(Level.name) private levelModel: Model<LevelDocument>,
  ) {}

  async create(createTipDto: CreateTipDto): Promise<Tip> {
    await this.validateReferences(createTipDto);

    const createdTip = new this.tipModel(createTipDto);
    return createdTip.save();
  }

  async findAll(
    query: any,
    page: number = 1,
    limit: number = 10,
    sort: string = 'createdAt',
  ): Promise<Tip[]> {
    const skip = (page - 1) * limit;
    const sortOptions: { [key: string]: 1 | -1 } = {};
    sortOptions[sort] = 1;

    const filter: any = { deletedAt: null };

    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    if (query.level) {
      filter.level = query.level;
    }
    if (query.technology) {
      filter.technology = { $in: query.technology.split(',') };
    }
    if (query.subtechnology) {
      filter.subtechnology = { $in: query.subtechnology.split(',') };
    }
    if (query.lang) {
      filter.lang = query.lang;
    }
    if (query.available) {
      filter.available = query.available === 'true';
    }

    return this.tipModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .populate('technology')
      .populate('subtechnology')
      .populate('lang')
      .populate('level')
      .exec();
  }

  async findOne(id: string): Promise<Tip> {
    const tip = await this.tipModel
      .findById(id)
      .populate('technology')
      .populate('subtechnology')
      .populate('lang')
      .populate('level')
      .exec();
    if (!tip || tip.deletedAt) {
      throw new NotFoundException('Tip not found');
    }
    return tip;
  }

  async update(id: string, updateTipDto: UpdateTipDto): Promise<Tip> {
    await this.validateReferences(updateTipDto);

    const tip = await this.tipModel
      .findByIdAndUpdate(id, updateTipDto, { new: true })
      .populate('technology')
      .populate('subtechnology')
      .populate('lang')
      .populate('level')
      .exec();
    if (!tip || tip.deletedAt) {
      throw new NotFoundException('Tip not found');
    }
    return tip;
  }

  async delete(id: string): Promise<void> {
    const tip = await this.tipModel.findById(id).exec();
    if (!tip) {
      throw new NotFoundException('Tip not found');
    }
    tip.deletedAt = new Date();
    await tip.save();
  }

  async validateReferences(tipDto: CreateTipDto | UpdateTipDto): Promise<void> {
    if (tipDto.technology) {
      const technologies = await this.technologyModel.find({
        _id: { $in: tipDto.technology },
      });
      if (technologies.length !== tipDto.technology.length) {
        throw new NotFoundException('Some technologies not found');
      }
    }

    if (tipDto.subtechnology) {
      const subtechnologies = await this.subtechnologyModel.find({
        _id: { $in: tipDto.subtechnology },
      });
      if (subtechnologies.length !== tipDto.subtechnology.length) {
        throw new NotFoundException('Some subtechnologies not found');
      }
    }

    if (tipDto.lang) {
      const langs = await this.langModel.find({ _id: { $in: tipDto.lang } });
      if (langs.length !== tipDto.lang.length) {
        throw new NotFoundException('Some languages not found');
      }
    }

    if (tipDto.level) {
      const levels = await this.levelModel.find({ _id: { $in: tipDto.level } });
      if (levels.length !== tipDto.level.length) {
        throw new NotFoundException('Some levels not found');
      }
    }
  }
}
