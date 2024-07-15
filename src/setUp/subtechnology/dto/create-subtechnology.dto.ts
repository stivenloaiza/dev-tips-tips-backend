import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubtechnologyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  technology?: number[];

  @IsOptional()
  @IsDate()
  createdAt?: Date | null;

  @IsOptional()
  @IsString()
  createBy?: string;

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
