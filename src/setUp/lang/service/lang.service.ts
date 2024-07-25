import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lang, LangDocument } from '../entities/lang.entity';
import { CreateLangDto } from '../dto/create-lang.dto';

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang.name) private langModel: Model<LangDocument>) {}

  async create(createLangDto: CreateLangDto): Promise<Lang> {
    try {
      const createdLang = new this.langModel(createLangDto);
      return createdLang.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Lang[]> {
    try {
      return this.langModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByIds(ids: number[]): Promise<Lang[]> {
    try {
      return this.langModel.find({ id: { $in: ids } }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<Lang> {
    try {
      const lang = await this.langModel.findOneAndDelete({ id }).exec();
      if (!lang) {
        throw new NotFoundException(`Lang with id ${id} not found`);
      }
      return lang;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
