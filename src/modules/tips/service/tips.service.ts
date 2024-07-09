import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip, TipDocument } from '../entities/tip.entity';
import { Technology, TechnologyDocument } from 'src/setUp/technology/entities/technology.entity';
import { Subtechnology, SubtechnologyDocument } from 'src/setUp/subtechnology/entities/subtechnology.entity';
import { Lang } from 'src/setUp/lang/entities/lang.entity';
import { Level, LevelDocument } from 'src/setUp/level/entities/level.entity';
import { CreateTipDto } from '../dto/create-tip.dto';
import { UpdateTipDto } from '../dto/update-tip.dto';

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
    const createdTip = new this.tipModel(createTipDto);
    return createdTip.save();
  }

  async findAll(filters: any): Promise<Tip[]> {
    const { page, limit, title, technology, subtechnology, lang, level } =
      filters;

    const query = this.tipModel.find();

    if (title) {
      query.where('title', new RegExp(title, 'i'));
    }
    if (technology) {
      query.where('technology').in([technology]);
    }
    if (subtechnology) {
      query.where('subtechnology').in([subtechnology]);
    }
    if (lang) {
      query.where('lang').in([lang]);
    }
    if (level) {
      query.where('level').in([level]);
    }

    return query
      .skip((page - 1) * limit)
      .limit(Number(limit))
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
      .populate('tecnology')
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
        id: { $in: tipDto.technology },
      });
      if (technologies.length !== tipDto.technology.length) {
        throw new NotFoundException('Some technologies not found');
      }
    }

    if (tipDto.subtechnology) {
      const subtechnologies = await this.subtechnologyModel.find({
        id: { $in: tipDto.subtechnology },
      });
      if (subtechnologies.length !== tipDto.subtechnology.length) {
        throw new NotFoundException('Some subtechnologies not found');
      }
    }

    if (tipDto.lang) {
      const langs = await this.langModel.find({ id: { $in: tipDto.lang } });
      if (langs.length !== tipDto.lang.length) {
        throw new NotFoundException('Some languages not found');
      }
    }

    if (tipDto.level) {
      const levels = await this.levelModel.find({ id: { $in: tipDto.level } });
      if (levels.length !== tipDto.level.length) {
        throw new NotFoundException('Some levels not found');
      }
    }
  }
}
