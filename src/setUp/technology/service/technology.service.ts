import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Technology, TechnologyDocument } from '../entities/technology.entity';
import { CreateTechnologyDto } from '../dto/create-technology.dto';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectModel(Technology.name)
    private technologyModel: Model<TechnologyDocument>,
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto): Promise<Technology> {
    try {
      const createdTechnology = new this.technologyModel(createTechnologyDto);
      return await createdTechnology.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create technology');
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Technology[]> {
    try {
      return await this.technologyModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve technologies');
    }
  }

  async findByIds(ids: number[]): Promise<Technology[]> {
    try {
      return await this.technologyModel.find({ id: { $in: ids } }).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve technologies by IDs',
      );
    }
  }

  async delete(id: string): Promise<Technology> {
    try {
      const technology = await this.technologyModel
        .findOneAndDelete({ id })
        .exec();
      if (!technology) {
        throw new NotFoundException(`Technology with id ${id} not found`);
      }
      return technology;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete technology');
    }
  }
}
