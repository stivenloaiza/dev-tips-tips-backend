import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateTipDto {
  @ApiProperty({
    description: 'URL of the image associated with the tip',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  multimedia_url?: string;

  @ApiProperty({
    description: 'Title of the tip',
    example: 'Getting Started with TypeScript',
  })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  title: string;

  @ApiProperty({
    description: 'Body content of the tip',
    example: 'TypeScript is a strongly typed superset of JavaScript...',
  })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  body: string;

  @ApiProperty({
    description: 'External link related to the tip',
    example: 'https://typescriptlang.org',
  })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({
    description: 'Availability status of the tip',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @ApiProperty({
    description: 'ID of the level associated with the tip',
    example: '60d9b45d8e3c8b001a3c3d6a',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  level: string;

  @ApiProperty({
    description: 'ID of the technology associated with the tip',
    example: '60d9b45d8e3c8b001a3c3d6b',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  technology: string;

  @ApiProperty({
    description: 'ID of the subtechnology associated with the tip',
    example: '60d9b45d8e3c8b001a3c3d6c',
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  subtechnology?: string;

  @ApiProperty({
    description: 'ID of the language associated with the tip',
    example: '60d9b45d8e3c8b001a3c3d6d',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  lang: string;

  @ApiProperty({
    description: 'Date and time when the tip was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiProperty({
    description: 'User who created the tip',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  createBy?: string;

  @ApiProperty({
    description: 'Date and time when the tip was last updated',
    example: '2023-01-02T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @ApiProperty({
    description: 'User who last updated the tip',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  updateBy?: string;

  @ApiProperty({
    description: 'Date and time when the tip was deleted',
    example: '2023-01-03T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  deletedAt?: Date;

  @ApiProperty({
    description: 'User who deleted the tip',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  deleteBy?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
