import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip, TipDocument } from '../entities/tip.entity';
import {
  Technology,
  TechnologyDocument,
} from 'src/setUp/technology/entities/technology.entity';
import {
  Subtechnology,
  SubtechnologyDocument,
} from 'src/setUp/subtechnology/entities/subtechnology.entity';
import { Level, LevelDocument } from 'src/setUp/level/entities/level.entity';
import { Lang, LangDocument } from 'src/setUp/lang/entities/lang.entity';
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
    await this.validateReferences(createTipDto);

    const technologyDetails = await this.getEntitiesDetails(
      this.technologyModel,
      createTipDto.technology,
    );
    const subtechnologyDetails = await this.getEntitiesDetails(
      this.subtechnologyModel,
      createTipDto.subtechnology,
    );
    const langDetails = await this.getEntitiesDetails(
      this.langModel,
      createTipDto.lang,
    );
    const levelDetails = await this.getEntitiesDetails(
      this.levelModel,
      createTipDto.level,
    );

    const createdTip = new this.tipModel({
      ...createTipDto,
      technology: technologyDetails,
      subtechnology: subtechnologyDetails,
      lang: langDetails,
      level: levelDetails,
    });

    return createdTip.save();
  }

  async findAll(filters: any): Promise<Tip[]> {
    const {
      page = 1,
      limit = 10,
      title,
      technology,
      subtechnology,
      lang,
      level,
    } = filters;

    const query = this.tipModel.find();

    if (title) {
      query.where('title', new RegExp(title, 'i'));
    }
    if (technology) {
      query.where('technology.name').in([technology]);
    }
    if (subtechnology) {
      query.where('subtechnology.name').in([subtechnology]);
    }
    if (lang) {
      query.where('lang.name').in([lang]);
    }
    if (level) {
      query.where('level.name').in([level]);
    }

    return query
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();
  }

  async findOne(id: string): Promise<Tip> {
    const tip = await this.tipModel.findById(id).exec();
    if (!tip || tip.deletedAt) {
      throw new NotFoundException('Tip not found');
    }
    return tip;
  }

  async update(id: string, updateTipDto: UpdateTipDto): Promise<Tip> {
    await this.validateReferences(updateTipDto);

    const technologyDetails = await this.getEntitiesDetails(
      this.technologyModel,
      updateTipDto.technology,
    );
    const subtechnologyDetails = await this.getEntitiesDetails(
      this.subtechnologyModel,
      updateTipDto.subtechnology,
    );
    const langDetails = await this.getEntitiesDetails(
      this.langModel,
      updateTipDto.lang,
    );
    const levelDetails = await this.getEntitiesDetails(
      this.levelModel,
      updateTipDto.level,
    );

    const tip = await this.tipModel
      .findByIdAndUpdate(
        id,
        {
          ...updateTipDto,
          technology: technologyDetails,
          subtechnology: subtechnologyDetails,
          lang: langDetails,
          level: levelDetails,
        },
        { new: true },
      )
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
    await this.validateEntityReferences(
      this.technologyModel,
      tipDto.technology,
      'Some technologies not found',
    );
    await this.validateEntityReferences(
      this.subtechnologyModel,
      tipDto.subtechnology,
      'Some subtechnologies not found',
    );
    await this.validateEntityReferences(
      this.langModel,
      tipDto.lang,
      'Some languages not found',
    );
    await this.validateEntityReferences(
      this.levelModel,
      tipDto.level,
      'Some levels not found',
    );
  }

  private async getEntitiesDetails(
    model: Model<any>,
    ids: string[],
  ): Promise<any[]> {
    const entities = await model.find({ _id: { $in: ids } }, '_id name').exec();
    return entities.map((entity) => ({
      _id: entity._id,
      name: entity.name,
    }));
  }

  private async validateEntityReferences(
    model: Model<any>,
    ids: string[],
    errorMessage: string,
  ): Promise<void> {
    if (ids) {
      const entities = await model.find({ _id: { $in: ids } }).exec();
      if (entities.length !== ids.length) {
        throw new NotFoundException(errorMessage);
      }
    }
  }
}
