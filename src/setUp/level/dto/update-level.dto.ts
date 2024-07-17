import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateLevelDto } from './create-level.dto';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @ApiProperty({
    description: 'The last update date of the level.',
    example: '2024-08-15T14:30:00Z',
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
    example: '2024-08-15T15:45:00Z',
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
