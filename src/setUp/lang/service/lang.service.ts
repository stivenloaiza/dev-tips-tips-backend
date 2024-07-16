import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lang, LangDocument } from '../entities/lang.entity';
import { CreateLangDto } from '../dto/create-lang.dto';

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang.name) private langModel: Model<LangDocument>) {}

  async create(createLangDto: CreateLangDto): Promise<Lang> {
    const createdLang = new this.langModel(createLangDto);
    return createdLang.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Lang[]> {
    return this.langModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findByIds(ids: number[]): Promise<Lang[]> {
    return this.langModel.find({ id: { $in: ids } }).exec();
  }

  async delete(id: string): Promise<Lang> {
    const lang = await this.langModel.findOneAndDelete({ id }).exec();
    if (!lang) {
      throw new NotFoundException(`Lang with id ${id} not found`);
    }
    return lang;
  }
}
