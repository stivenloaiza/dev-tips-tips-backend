import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
