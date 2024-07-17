import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { CreateTipDto } from '../dto/create-tip.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TipsService } from '../service/tips.service';
import { TipGuard } from 'src/libs/guards/ForwardingTips/tip.guard';

@ApiTags('Tips')
@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new tip' })
  @ApiBody({ type: CreateTipDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Tips has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async create(@Body() create: CreateTipDto) {
    return this.tipsService.create(create);
  }

  // TODO: mejora de codigo segun nuevos cambios
  // @Post('random')
  // @ApiOperation({ summary: 'Get random tips based on filters' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Random list of tips based on filters.',
  // })
  // async RandomTips(@Body() filters: CreateTipDto) {
  //   try {
  //     return await this.tipsService.getRandomTips(filters);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Get('all')
  @ApiOperation({ summary: 'Obtain all tips with filters and pagination' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number for pagination (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit of items per page (default: 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    description: 'Filter by title of the tip',
    example: 'Tips TypeScript',
  })
  @ApiQuery({
    name: 'technology',
    required: false,
    type: String,
    description: 'Filter by technology',
    example: '609c6c5b0e468c3c24cfe8a5',
  })
  @ApiQuery({
    name: 'subtechnology',
    required: false,
    type: String,
    description: 'Filter by subtechnology',
    example: 'F609c6c5b0e468c3c24cfe8a5unctions',
  })
  @ApiQuery({ name: 'lang', required: false, type: String, example: 'English' })
  @ApiQuery({
    name: 'level',
    required: false,
    type: String,
    description: 'Filter by level',
    example: '609c6c5b0e468c3c24cfe8a5',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    type: String,
    description: 'Filter by language',
    example: '609c6c5b0e468c3c24cfe8a5',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved list of Tips.',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query parameters provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('level') level?: string,
    @Query('technology') technology?: string,
    @Query('subtechnology') subtechnology?: string,
    @Query('lang') lang?: string,
  ) {
    const all = { page, limit, level, technology, subtechnology, lang };
    return this.tipsService.findAll(all);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single tip by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the tip to retrieve',
    example: '609c6c5b0e468c3c24cfe8a5',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Tip has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid ID provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.tipsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // TODO: mejora de codigo segun nuevos cambios
  // @Put(':id')
  // @ApiOperation({ summary: 'Update a tip by id' })
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   description: 'ID of the tip to update',
  //   example: '609c6c5b0e468c3c24cfe8a5',
  // })
  // @ApiBody({ type: UpdateTipDto })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'The Tip has been successfully deleted.',
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'Invalid ID provided.',
  // })
  // @ApiInternalServerErrorResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: 'Internal server error.',
  // })
  // async update(@Param('id') id: string, @Body() updateTipDto: UpdateTipDto) {
  //   try {
  //     return await this.tipsService.update(id, updateTipDto);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Tip by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Tip has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid ID provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async remove(@Param('id') id: string) {
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
