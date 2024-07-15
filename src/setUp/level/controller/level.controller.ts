import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { LevelService } from '../service/level.service';
import { CreateLevelDto } from '../dto/create-level.dto';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('new')
  async create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get('all')
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.levelService.findAll(page, limit);
  }

  @Delete(':id')
  async delete(@Param('_id') id: number) {
    return this.levelService.delete(id);
  }
}
