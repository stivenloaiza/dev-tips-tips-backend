import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { LangService } from '../service/lang.service';
import { CreateLangDto } from '../dto/create-lang.dto';
import { Lang } from '../entities/lang.entity';
import {
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Langs')
/* @ApiHeader({
  name: 'x-api-key',
  description: 'API key needed to access this endpoint',
}) */
@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new Language entry' })
  @ApiBody({ type: CreateLangDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Language entry has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  create(@Body() createLangDto: CreateLangDto): Promise<Lang> {
    return this.langService.create(createLangDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all Language entries with pagination' })
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
    description: 'List of Language entries retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query parameters provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Lang[]> {
    return this.langService.findAll(page, limit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language entry by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Language entry has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid ID provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  delete(@Param('_id') id: string): Promise<Lang> {
    return this.langService.delete(id);
  }
}
