import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { LevelService } from '../service/level.service';
import { CreateLevelDto } from '../dto/create-level.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Level } from '../entities/level.entity';

@ApiTags('Levels')
/* @ApiHeader({
  name: 'x-api-key',
  description: 'API key needed to access this endpoint',
}) */
@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new Level' })
  @ApiBody({ type: CreateLevelDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Level has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all Levels with pagination' })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved list of Level.',
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
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Level[]> {
    return await this.levelService.findAll(page, limit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Level by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Level has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async delete(@Param('_id') id: string) {
    return this.levelService.delete(id);
  }
}
