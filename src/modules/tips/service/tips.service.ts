import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip, TipDocument } from '../entities/tip.entity';
import {
  Technology,
  TechnologyDocument,
} from 'src/setUp/technology/entities/technology.entity';
import { Lang, LangDocument } from 'src/setUp/lang/entities/lang.entity';
import { Level, LevelDocument } from 'src/setUp/level/entities/level.entity';
import { CreateTipDto } from '../dto/create-tip.dto';
import { UpdateTipDto } from '../dto/update-tip.dto';
} from '../../../setUp/technology/entities/technology.entity';
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Tip> {
    try {
      const tip = await this.tipModel.findById(id).exec();
      if (!tip || tip.deletedAt) {
        throw new NotFoundException('Tip not found');
      }
      return tip;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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

      return tip;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
