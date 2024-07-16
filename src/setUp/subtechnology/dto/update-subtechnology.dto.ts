import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateSubtechnologyDto } from './create-subtechnology.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateSubtechnologyDto extends PartialType(
  CreateSubtechnologyDto,
){
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
