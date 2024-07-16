import { Injectable, NotFoundException } from '@nestjs/common';
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
    const createdTechnology = new this.technologyModel(createTechnologyDto);
    return createdTechnology.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Technology[]> {
    return this.technologyModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findByIds(ids: number[]): Promise<Technology[]> {
    return this.technologyModel.find({ id: { $in: ids } }).exec();
  }

  async delete(id: string): Promise<Technology> {
    const technology = await this.technologyModel
      .findOneAndDelete({ id })
      .exec();
    if (!technology) {
      throw new NotFoundException(`Technology with id ${id} not found`);
    }
    return technology;
  }
}
