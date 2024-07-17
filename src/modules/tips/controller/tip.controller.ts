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
  UseGuards,
} from '@nestjs/common';
import { CreateTipDto } from '../dto/create-tip.dto';
import { UpdateTipDto } from '../dto/update-tip.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TipsService } from '../service/tips.service';
import { TipGuard } from 'src/libs/guards/ForwardingTips/tip.guard';

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

  @Post('random')
  @ApiOperation({ summary: 'Get random tips based on filters' })
  @ApiResponse({
    status: 200,
    description: 'Random list of tips based on filters.',
  })
  async RandomTips(@Body() filters: CreateTipDto) {
    try {
      return await this.tipsService.getRandomTips(filters);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all')
  @ApiOperation({ summary: 'Obtain all tips with filters and pagination' })
  @ApiResponse({ status: 200, description: 'List of all tips.' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    example: 'Introduction',
  })
  @ApiQuery({
    name: 'technology',
    required: false,
    type: String,
    example: 'JavaScript',
  })
  @ApiQuery({
    name: 'subtechnology',
    required: false,
    type: String,
    example: 'Arrow Functions',
  })
  @ApiQuery({ name: 'lang', required: false, type: String, example: 'English' })
  @ApiQuery({
    name: 'level',
    required: false,
    type: String,
    example: 'Beginner',
  })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('title') title?: string,
    @Query('technology') technology?: string,
    @Query('subtechnology') subtechnology?: string,
    @Query('lang') lang?: string,
    @Query('level') level?: string,
  ) {
    try {
      return await this.tipsService.findAll({
        page,
        limit,
        title,
        technology,
        subtechnology,
        lang,
        level,
      });
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
  async findOne(@Param('_id') id: string) {
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
  async update(@Param('_id') id: string, @Body() updateTipDto: UpdateTipDto) {
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
  async remove(@Param('_id') id: string) {
    try {
      await this.tipsService.delete(id);
      return { message: 'Tip deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // Controlador para Enviar Tips
  @Post('send')
  @UseGuards(TipGuard)
  async sendTip(@Body('userId') userId: string, @Body('tipId') tipId: string) {
    return { message: `${userId} - ${tipId} - Tip enviado con éxito` };
  }
}
