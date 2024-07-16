import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateTechnologyDto } from './create-technology.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {
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
