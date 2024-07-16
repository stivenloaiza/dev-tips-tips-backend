import { Injectable, NotFoundException } from '@nestjs/common';
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
    const createdSubtechnology = new this.subtechnologyModel(
      createSubtechnologyDto,
    );
    return createdSubtechnology.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<Subtechnology[]> {
    return this.subtechnologyModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findByIds(ids: number[]): Promise<Subtechnology[]> {
    return this.subtechnologyModel.find({ id: { $in: ids } }).exec();
  }

  async delete(id: string): Promise<Subtechnology> {
    const subtechnology = await this.subtechnologyModel
      .findOneAndDelete({ id })
      .exec();
    if (!subtechnology) {
      throw new NotFoundException(`Subtechnology with id ${id} not found`);
    }
    return subtechnology;
  }
}
