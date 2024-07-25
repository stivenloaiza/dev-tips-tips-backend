import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level, LevelDocument } from '../entities/level.entity';
import { CreateLevelDto } from '../dto/create-level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectModel(Level.name) private levelModel: Model<LevelDocument>,
  ) {}

  async create(create: CreateLevelDto): Promise<Level> {
    try {
      const createdLang = new this.levelModel(create);
      return createdLang.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(page: number, limit: number): Promise<Level[]> {
    try {
      return this.levelModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByIds(ids: number[]): Promise<Level[]> {
    try {
      return this.levelModel.find({ id: { $in: ids } }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.levelModel.deleteOne({ id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Level with id ${id} not found`);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
