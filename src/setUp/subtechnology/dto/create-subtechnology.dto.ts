import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubtechnologyDto {
  @ApiProperty({
    description: 'The name of the subtechnology',
    example: 'Angular',
  })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Array of technology IDs associated with the subtechnology',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  technology?: number[];

  @ApiPropertyOptional({
    description: 'The date and time when the subtechnology was created',
    example: '2023-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date | null;

  @ApiPropertyOptional({
    description: 'The user who created the subtechnology',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  createBy?: string;

  @ApiPropertyOptional({
    description: 'The date and time when the subtechnology was last updated',
    example: '2023-01-02T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @ApiPropertyOptional({
    description: 'The user who last updated the subtechnology',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @ApiPropertyOptional({
    description: 'The date and time when the subtechnology was deleted',
    example: '2023-01-03T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @ApiPropertyOptional({
    description: 'The user who deleted the subtechnology',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  deleteBy?: string;
}
