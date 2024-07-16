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
import { Level } from '../entities/level.entity';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('new')
  async createlevel(@Body() createDto: CreateLevelDto): Promise<Level> {
    return await this.levelService.create(createDto);
  }

  @Get('all')
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.levelService.findAll(page, limit);
  }

  @Delete(':id')
  async delete(@Param('_id') id: number) {
    return this.levelService.delete(id);
  }
}
