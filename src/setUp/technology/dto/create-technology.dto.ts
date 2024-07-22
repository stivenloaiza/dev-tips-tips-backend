import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty({
    description: 'The name of the technology',
    example: 'Node.js',
  })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Array of subtechnology IDs associated with the technology',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  subtechnology?: number[];

  @ApiProperty({
    description: 'The date and time when the technology was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date | null;

  @ApiProperty({
    description: 'The user who created the technology',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  createBy?: string;

  @ApiProperty({
    description: 'The date and time when the technology was last updated',
    example: '2023-01-02T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @ApiProperty({
    description: 'The user who last updated the technology',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @ApiProperty({
    description: 'The date and time when the technology was deleted',
    example: '2023-01-03T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @ApiProperty({
    description: 'The user who deleted the technology',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  deleteBy?: string;
}
