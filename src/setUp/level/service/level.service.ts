import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level, LevelDocument } from '../entities/level.entity';
import { CreateLevelDto } from '../dto/create-level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectModel(Level.name) private levelModel: Model<LevelDocument>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const createdLevel = new this.levelModel(createLevelDto);
    return createdLevel.save();
  }

  async findAll(page: number, limit: number): Promise<Level[]> {
    return this.levelModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findByIds(ids: number[]): Promise<Level[]> {
    return this.levelModel.find({ id: { $in: ids } }).exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.levelModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
  }
}
