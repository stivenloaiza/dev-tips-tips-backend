import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createDto: CreateTipDto): Promise<Tip> {
    const level = await this.levelModel.findById(createDto.level);
    if (!level) throw new NotFoundException('Technology not found');

    const technology = await this.technologyModel.findById(
      createDto.technology,
    );
    if (!technology) throw new NotFoundException('Technology not found');

    const subtechnology = await this.subtechnologyModel.findById(
      createDto.subtechnology,
    );
    if (!subtechnology) throw new NotFoundException('subtechnology not found');

    const lang = await this.langModel.findById(createDto.lang);
    if (!lang) throw new NotFoundException('lang not found');

    const data = {
      multimedia_url: createDto.multimedia_url,
      title: createDto.title,
      body: createDto.body,
      link: createDto.link,
      available: true,
      level: level.name,
      technology: technology.name,
      subtechnology: subtechnology.name,
      lang: lang.name,
      createdAt: createDto.createdAt,
      createBy: createDto.createBy,
      updatedAt: createDto.updatedAt,
      updateBy: createDto.updateBy,
      deletedAt: createDto.deletedAt,
      deleteBy: createDto.deleteBy,
    };

    return (await this.tipModel.create(data)).save();
  }

  async findAll(filters: any): Promise<Tip[]> {
    const query: any = {};

    if (filters.level) {
      query.level = filters.level;
    }
    if (filters.technology) {
      query.technology = filters.technology;
    }
    if (filters.subtechnology) {
      query.subtechnology = filters.subtechnology;
    }
    if (filters.lang) {
      query.lang = filters.lang;
    }

    const limit = filters.limit ? parseInt(filters.limit, 10) : 10;
    const page = filters.page ? parseInt(filters.page, 10) : 1;
    const skip = (page - 1) * limit;

    return await this.tipModel.find(query).skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Tip> {
    try {
      const tip = await this.tipModel.findById(id).exec();
      if (!tip || tip.deletedAt) {
        throw new NotFoundException('Tip not found');
      }
      return  tip;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const tip = await this.tipModel.findById(id).exec();
      if (!tip) {
        throw new NotFoundException('Tip not found');
      }
      tip.deletedAt = new Date();
      await tip.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateTipDto: UpdateTipDto): Promise<Tip> {
    try {
      await this.validateReferences(updateTipDto);

      const technologyDetails = await this.getEntitiesDetails(
        this.technologyModel,
        [updateTipDto.technology],
      );
      const subtechnologyDetails = await this.getEntitiesDetails(
        this.subtechnologyModel,
        [updateTipDto.subtechnology],
      );
      const langDetails = await this.getEntitiesDetails(this.langModel, [
        updateTipDto.lang,
      ]);
      const levelDetails = await this.getEntitiesDetails(this.levelModel, [
        updateTipDto.level,
      ]);

      const tip = await this.tipModel
        .findByIdAndUpdate(
          id,
          {
            ...updateTipDto,
            technology: technologyDetails[0].name,
            subtechnology: subtechnologyDetails[0].name,
            lang: langDetails[0].name,
            level: levelDetails[0].name,
          },
          { new: true },
        )
        .exec();

      if (!tip || tip.deletedAt) {
        throw new NotFoundException('Tip not found');
      }

      return tip;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateReferences(tipDto: CreateTipDto | UpdateTipDto): Promise<void> {
    try {
      await this.validateEntityReferences(
        this.technologyModel,
        [tipDto.technology],
        'Technology not found',
      );
      await this.validateEntityReferences(
        this.subtechnologyModel,
        [tipDto.subtechnology],
        'Subtechnology not found',
      );
      await this.validateEntityReferences(
        this.langModel,
        [tipDto.lang],
        'Lang not found',
      );
      await this.validateEntityReferences(
        this.levelModel,
        [tipDto.level],
        'Level not found',
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async getEntitiesDetails(
    model: Model<any>,
    ids: string[],
  ): Promise<any[]> {
    try {
      const entities = await model
        .find({ _id: { $in: ids } }, '_id name')
        .exec();
      return entities.map((entity) => ({
        name: entity.name,
      }));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async validateEntityReferences(
    model: Model<any>,
    ids: string[],
    errorMessage: string,
  ): Promise<void> {
    try {
      if (ids) {
        const entities = await model.find({ _id: { $in: ids } }).exec();
        if (entities.length !== ids.length) {
          throw new NotFoundException(errorMessage);
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRandomTips(filters: { technology?: string; lang?: string; level?: string; limit: number }): Promise<Tip[]> {
    const { technology, lang, level, limit } = filters;
  
    const query: any = {};
    if (technology) query.technology = technology;
    if (lang) query.lang = lang;
    if (level) query.level = level;
  
    const count = await this.tipModel.countDocuments(query).exec();
    const effectiveLimit = Math.min(limit, count);
  
    const randomIndexes = new Set<number>();
    while (randomIndexes.size < effectiveLimit) {
      randomIndexes.add(Math.floor(Math.random() * count));
    }
  
    const tips = await Promise.all(
      Array.from(randomIndexes).map((index) => this.tipModel.findOne(query).skip(index).exec())
    );
  
    return tips;
  }
}
