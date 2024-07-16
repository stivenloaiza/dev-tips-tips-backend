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

  async create(createTipDto: CreateTipDto): Promise<Tip> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(
    filters: any,
  ): Promise<{ data: Tip[]; total: number; page: number; limit: number }> {
    try {
      const {
        page = 1,
        limit = 10,
        title,
        technology,
        subtechnology,
        lang,
        level,
      } = filters;

      const query = this.tipModel
        .find()
        .populate('technology', 'name')
        .populate('subtechnology', 'name')
        .populate('lang', 'name')
        .populate('level', 'name');

      if (title) {
        query.where('title', new RegExp(title, 'i'));
      }
      if (technology) {
        const technologyIds = await this.getEntityIds(
          this.technologyModel,
          technology,
        );
        query.where('technology').in(technologyIds);
      }
      if (subtechnology) {
        const subtechnologyIds = await this.getEntityIds(
          this.subtechnologyModel,
          subtechnology,
        );
        query.where('subtechnology').in(subtechnologyIds);
      }
      if (lang) {
        const langIds = await this.getEntityIds(this.langModel, lang);
        query.where('lang').in(langIds);
      }
      if (level) {
        const levelIds = await this.getEntityIds(this.levelModel, level);
        query.where('level').in(levelIds);
      }

      const total = await this.tipModel.countDocuments(query);
      const data = await query
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .exec();

      // Convertir las entidades a los nombres correspondientes
      const formattedData = data.map((tip) => ({
        ...tip.toObject(),
        technology: tip.technology.map((tech: any) => tech.name),
        subtechnology: tip.subtechnology.map((subtech: any) => subtech.name),
        lang: tip.lang.map((language: any) => language.name),
        level: tip.level.map((lvl: any) => lvl.name),
      }));

      return { data: formattedData, total, page, limit };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async getEntityIds(
    model: Model<any>,
    names: string,
  ): Promise<string[]> {
    try {
      const entities = await model
        .find({ name: { $in: names.split(',') } }, '_id')
        .exec();
      return await entities.map((entity) => entity._id.toString());
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<Tip> {
    try {
      const tip = await this.tipModel.findById(id).exec();
      if (!tip || tip.deletedAt) {
        throw new NotFoundException('Tip not found');
      }
      return await tip;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateTipDto: UpdateTipDto): Promise<Tip> {
    try {
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

      return await tip;
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

  async validateReferences(tipDto: CreateTipDto | UpdateTipDto): Promise<void> {
    try {
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
      return await entities.map((entity) => ({
        _id: entity._id,
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

  async getRandomTips(filters: CreateTipDto | UpdateTipDto): Promise<any[]> {
    try {
      const { technology, subtechnology, lang, level, limit } = filters;
      const query = this.tipModel.find();

      if (technology && technology.length > 0) {
        const technologyIds = await this.getEntityIdsByName(
          this.technologyModel,
          technology,
        );
        query.where('technology').in(technologyIds);
      }
      if (subtechnology && subtechnology.length > 0) {
        const subtechnologyIds = await this.getEntityIdsByName(
          this.subtechnologyModel,
          subtechnology,
        );
        query.where('subtechnology').in(subtechnologyIds);
      }
      if (lang && lang.length > 0) {
        const langIds = await this.getEntityIdsByName(this.langModel, lang);
        query.where('lang').in(langIds);
      }
      if (level && level.length > 0) {
        const levelIds = await this.getEntityIdsByName(this.levelModel, level);
        query.where('level').in(levelIds);
      }

      const tips = await query.exec();
      const randomTips = this.shuffleArray(tips).slice(0, limit);

      // Convertir las entidades a los nombres correspondientes
      const formattedData = await Promise.all(
        randomTips.map(async (tip) => ({
          ...tip.toObject(),
          technology: await this.getNamesByIds(
            this.technologyModel,
            tip.technology,
          ),
          subtechnology: await this.getNamesByIds(
            this.subtechnologyModel,
            tip.subtechnology,
          ),
          lang: await this.getNamesByIds(this.langModel, tip.lang),
          level: await this.getNamesByIds(this.levelModel, tip.level),
        })),
      );

      return formattedData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async getEntityIdsByName(
    model: Model<any>,
    names: string[],
  ): Promise<string[]> {
    try {
      const entities = await model.find({ name: { $in: names } }, '_id').exec();
      if (entities.length !== names.length) {
        throw new NotFoundException('Some names not found');
      }
      return entities.map((entity) => entity._id.toString());
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async getNamesByIds(
    model: Model<any>,
    ids: string[],
  ): Promise<string[]> {
    try {
      const entities = await model.find({ _id: { $in: ids } }, 'name').exec();
      return entities.map((entity) => entity.name);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
