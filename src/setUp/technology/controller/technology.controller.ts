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
import { TechnologyService } from '../service/technology.service';
import { CreateTechnologyDto } from '../dto/create-technology.dto';
import { Technology } from '../entities/technology.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Technology')
@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a Technology' })
  @ApiBody({ type: CreateTechnologyDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Technology has been successfully created.',
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
    @Body() createTechnologyDto: CreateTechnologyDto,
  ): Promise<Technology> {
    return this.technologyService.create(createTechnologyDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all Technology with pagination' })
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
    description: 'Successfully retrieved list of Technology.',
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
  ): Promise<Technology[]> {
    return this.technologyService.findAll(page, limit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Technology by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Technology has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid ID provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  remove(@Param('_id') id: string): Promise<Technology> {
    return this.technologyService.delete(id);
  }
}
