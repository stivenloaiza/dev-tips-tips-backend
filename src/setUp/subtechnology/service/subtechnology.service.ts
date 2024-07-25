import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subtechnology,
  SubtechnologyDocument,
} from '../entities/subtechnology.entity';
import { CreateSubtechnologyDto } from '../dto/create-subtechnology.dto';

@Injectable()
export class SubtechnologyService {
  constructor(
    @InjectModel(Subtechnology.name)
    private subtechnologyModel: Model<SubtechnologyDocument>,
  ) {}

  async create(
    createSubtechnologyDto: CreateSubtechnologyDto,
  ): Promise<Subtechnology> {
    try {
      const createdSubtechnology = await new this.subtechnologyModel(
        createSubtechnologyDto,
      );
      return createdSubtechnology.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<Subtechnology[]> {
    try {
      return await this.subtechnologyModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByIds(ids: number[]): Promise<Subtechnology[]> {
    try {
      return await this.subtechnologyModel.find({ id: { $in: ids } }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<Subtechnology> {
    try {
      const subtechnology = await this.subtechnologyModel
        .findOneAndDelete({ id })
        .exec();
      if (!subtechnology) {
        throw new NotFoundException(`Subtechnology with id ${id} not found`);
      }
      return subtechnology;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
