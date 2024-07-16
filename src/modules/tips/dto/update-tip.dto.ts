import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTipDto } from './create-tip.dto';

export class UpdateTipDto extends PartialType(CreateTipDto) {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  updateBy?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deletedAt?: Date;

  @IsString()
  @IsOptional()
  deleteBy?: string;
}
