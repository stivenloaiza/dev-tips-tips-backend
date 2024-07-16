import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubtechnologyService } from '../service/subtechnology.service';
import { CreateSubtechnologyDto } from '../dto/create-subtechnology.dto';
import { Subtechnology } from '../entities/subtechnology.entity';

@Controller('subtechnology')
export class SubtechnologyController {
  constructor(private readonly subtechnologyService: SubtechnologyService) {}

  @Post('new')
  async createNew(
    @Body() createSubtechnologyDto: CreateSubtechnologyDto,
  ): Promise<Subtechnology> {
    return await this.subtechnologyService.create(createSubtechnologyDto);
  }

  @Get('all')
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Subtechnology[]> {
    return await this.subtechnologyService.findAll(page, limit);
  }

  @Delete(':id')
  async remove(@Param('_id') id: number): Promise<Subtechnology> {
    return await this.subtechnologyService.delete(id);
  }
}
