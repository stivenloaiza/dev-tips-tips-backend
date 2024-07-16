import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ 
    description: 'The name of the level.',
    example: 'Junior',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'The creation date of the level.',
    example: '2024-07-15T12:00:00Z',
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date | null;

  @ApiProperty({ 
    description: 'The creator of the level.',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  createBy?: string;

  @ApiProperty({ 
    description: 'The last update date of the level.',
    example: '2024-07-15T14:30:00Z',
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @ApiProperty({ 
    description: 'The updater of the level.',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @ApiProperty({ 
    description: 'The deletion date of the level.',
    example: '2024-07-15T15:45:00Z',
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @ApiProperty({ 
    description: 'The deleter of the level.',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  deleteBy?: string;
}
