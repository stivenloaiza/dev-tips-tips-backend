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
import { SubtechnologyService } from '../service/subtechnology.service';
import { CreateSubtechnologyDto } from '../dto/create-subtechnology.dto';
import { Subtechnology } from '../entities/subtechnology.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Sub-Technology')
@Controller('subtechnology')
export class SubtechnologyController {
  constructor(private readonly subtechnologyService: SubtechnologyService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new Sub-Technology' })
  @ApiBody({ type: CreateSubtechnologyDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Sub-Technology has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  create(
    @Body() createSubtechnologyDto: CreateSubtechnologyDto,
  ): Promise<Subtechnology> {
    return this.subtechnologyService.create(createSubtechnologyDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all Sub-Technology with pagination' })
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
    description: 'Successfully retrieved list of Sub-Technology.',
  })
  @ApiBadRequestResponse({
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
  ): Promise<Subtechnology[]> {
    return this.subtechnologyService.findAll(page, limit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Sub-Technology by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Sub-Technology entry has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid ID provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  delete(@Param('_id') id: string): Promise<Subtechnology> {
    return this.subtechnologyService.delete(id);
  }
}
