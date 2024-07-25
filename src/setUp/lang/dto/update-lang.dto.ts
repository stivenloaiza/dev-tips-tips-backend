import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateLangDto } from './create-lang.dto';

export class UpdateLangDto extends PartialType(CreateLangDto) {
  @ApiProperty({
    description: 'The timestamp when this language entry was last updated.',
    example: '2024-08-15T14:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @ApiProperty({
    description: 'The user who last updated this language entry.',
    example: 'Jane Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @ApiProperty({
    description: 'The timestamp when this language entry was deleted.',
    example: '2024-07-15T16:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @ApiProperty({
    description: 'The user who deleted this language entry.',
    example: 'Admin',
    required: false,
  })
  @IsOptional()
  @IsString()
  deleteBy?: string;
}
