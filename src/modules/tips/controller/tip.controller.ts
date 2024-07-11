import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateTipDto } from '../dto/create-tip.dto';
import { UpdateTipDto } from '../dto/update-tip.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TipsService } from '../service/tips.service';

@ApiTags('Tips')
@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new tip' })
  @ApiResponse({
    status: 201,
    description: 'The tip has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTipDto: CreateTipDto) {
    try {
      return await this.tipsService.create(createTipDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all tips with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'List of tips.',
  })
  async findAll(@Query() query) {
    try {
      return await this.tipsService.findAll(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single tip by id' })
  @ApiResponse({
    status: 200,
    description: 'The tip found.',
  })
  @ApiResponse({ status: 404, description: 'Tip not found.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.tipsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a tip by id' })
  @ApiResponse({
    status: 200,
    description: 'The tip has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Tip not found.' })
  async update(@Param('id') id: string, @Body() updateTipDto: UpdateTipDto) {
    try {
      return await this.tipsService.update(id, updateTipDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tip by id' })
  @ApiResponse({
    status: 200,
    description: 'The tip has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Tip not found.' })
  async remove(@Param('id') id: string) {
    try {
      await this.tipsService.delete(id);
      return { message: 'Tip deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}