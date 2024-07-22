import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLangDto {
  @ApiProperty({
    description: 'The name of the language.',
    example: 'English',
  })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The user who created this language entry.',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  createBy?: string;

  @ApiProperty({
    description: 'The timestamp when this language entry was created.',
    example: '2024-07-15T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsString()
  createdAt?: string;

  @ApiProperty({
    description: 'The user who last updated this language entry.',
    example: 'Jane Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @ApiProperty({
    description: 'The timestamp when this language entry was last updated.',
    example: '2024-07-15T14:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedAt?: Date | null;

  @ApiProperty({
    description: 'The user who deleted this language entry.',
    example: 'Admin',
    required: false,
  })
  @IsOptional()
  @IsString()
  deleteBy?: string;

  @ApiProperty({
    description: 'The timestamp when this language entry was deleted.',
    example: '2024-07-15T15:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsString()
  deletedAt?: Date | null;
}
