import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLangDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  createBy?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsString()
  updateBy?: string;

  @IsOptional()
  @IsString()
  updatedAt?: Date | null;

  @IsOptional()
  @IsString()
  deleteBy?: string;

  @IsOptional()
  @IsString()
  deletedAt?: Date | null;
}
