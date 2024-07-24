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
  Put,
} from '@nestjs/common';
import { CreateTipDto } from '../dto/create-tip.dto';
import { UpdateTipDto } from '../dto/update-tip.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';
import { TipsService } from '../service/tips.service';
import { TipGuard } from 'src/libs/guards/ForwardingTips/tip.guard'; 
import { Tip } from '../entities/tip.entity';

@ApiTags('Tips')
 @ApiHeader({
  name: 'x-api-key',
  description: 'API key needed to access this endpoint',
}) 
@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}


  @Get('random')
  @ApiOperation({ summary: 'Get random tips based on filters' })
  @ApiResponse({ status: 200, description: 'Random tips based on filters' })
  @ApiQuery({ name: 'technology', required: false, description: 'Filter by technology' })
  @ApiQuery({ name: 'lang', required: false, description: 'Filter by language' })
  @ApiQuery({ name: 'level', required: false, description: 'Filter by level' })
  @ApiQuery({ name: 'limit', required: true, description: 'Number of tips to retrieve', example: 4 })
  async getRandomTips(
    @Query('technology') technology?: string,
    @Query('lang') lang?: string,
    @Query('level') level?: string,
    @Query('limit') limit = 4
  ): Promise<Tip[]> {
    const filters = {
      technology,
      lang,
      level,
      limit: parseInt(limit as any, 10), 
    };
    return this.tipsService.getRandomTips(filters);
  }
  @Post('new')
  @ApiOperation({ summary: 'Create a new tip' })
  @ApiBody({ type: CreateTipDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Tip has been successfully created.',
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
    example: 'Javascript',
  })
  @ApiQuery({
    name: 'subtechnology',
    required: false,
    type: String,
    description: 'Filter by subtechnology',
    example: 'Reactjs',
  })
  @ApiQuery({
    name: 'lang',
    required: false,
    type: String,
    description: 'Filter by language',
    example: 'English',
  })
  @ApiQuery({
    name: 'level',
    required: false,
    type: String,
    description: 'Filter by level',
    example: 'Senior',
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
    @Query('title') title?: string,
    @Query('technology') technology?: string,
    @Query('subtechnology') subtechnology?: string,
    @Query('lang') lang?: string,
    @Query('level') level?: string,
  ) {
    const filters = {
      page,
      limit,
      title,
      technology,
      subtechnology,
      lang,
      level,
    };
    return this.tipsService.findAll(filters);
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
    description: 'Successfully retrieved the tip.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tip not found.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async findOne(@Param('_id') id: string) {
    try {
      return await this.tipsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a tip by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the tip to update',
    example: '609c6c5b0e468c3c24cfe8a5',
  })
  @ApiBody({ type: UpdateTipDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Tip has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tip not found.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async update(@Param('_id') id: string, @Body() updateTipDto: UpdateTipDto) {
    try {
      return await this.tipsService.update(id, updateTipDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Tip by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Tip has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tip not found.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async remove(@Param('_id') id: string) {
    try {
      await this.tipsService.delete(id);
      return { message: 'Tip deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('send')
  @ApiOperation({ summary: 'Send a tip' })
 @UseGuards(TipGuard) 
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user123' },
        tipId: { type: 'string', example: 'tip456' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tip successfully sent.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async sendTip(@Body('userId') userId: string, @Body('_id') tipId: string) {
    return { message: `${userId} - ${tipId} - Tip sent successfully` };
  }

  
}
