import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LangService } from '../service/lang.service';
import { CreateLangDto } from '../dto/create-lang.dto';
import { Lang } from '../entities/lang.entity';

@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Post('new')
  create(@Body() createLangDto: CreateLangDto): Promise<Lang> {
    return this.langService.create(createLangDto);
  }

  @Get('all')
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Lang[]> {
    return this.langService.findAll(page, limit);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Lang> {
    return this.langService.delete(id);
  }
}
