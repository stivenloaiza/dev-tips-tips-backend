import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateTechnologyDto } from './create-technology.dto';

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {
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
