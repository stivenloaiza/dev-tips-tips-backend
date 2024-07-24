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
  NotFoundException,
} from '@nestjs/common';
import { TechnologyService } from '../service/technology.service';
import { CreateTechnologyDto } from '../dto/create-technology.dto';
import { Technology } from '../entities/technology.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Technology')
@ApiHeader({
  name: 'x-api-key',
  description: 'API key needed to access this endpoint',
})
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
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async create(
    @Body() createTechnologyDto: CreateTechnologyDto,
  ): Promise<Technology> {
    try {
      return await this.technologyService.create(createTechnologyDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create technology',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Technology[]> {
    try {
      return await this.technologyService.findAll(page, limit);
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve technologies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Technology by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Technology has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Technology not found.',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async remove(@Param('id') id: string): Promise<Technology> {
    try {
      return await this.technologyService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          `Technology with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Failed to delete technology',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
