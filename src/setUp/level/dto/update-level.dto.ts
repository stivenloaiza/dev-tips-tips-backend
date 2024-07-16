import { PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateLevelDto } from './create-level.dto';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @IsOptional()
  @IsString()
  updateBy?: string;

  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @IsOptional()
  @IsString()
  deleteBy?: string;
}
