import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateSubtechnologyDto } from './create-subtechnology.dto';

export class UpdateSubtechnologyDto extends PartialType(
  CreateSubtechnologyDto,
) {
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
