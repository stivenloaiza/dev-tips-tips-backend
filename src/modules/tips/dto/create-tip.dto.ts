import { IsNumber, IsOptional, IsString, IsBoolean, IsDateString, ArrayNotEmpty, ArrayMinSize, IsMongoId } from 'class-validator';

export class CreateTipDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  img_url?: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsBoolean()
  available: boolean;

  @ArrayNotEmpty()
  @IsMongoId()
  @IsString({ each: true })
  level: string[];

  @ArrayNotEmpty()
  @IsMongoId({each: true})
  @IsString({ each: true }) 
  technology: string[];

  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @IsString({ each: true })
  subtechnology: string[];

  @ArrayNotEmpty()
  @IsMongoId({ each: true }) 
  @IsString({ each: true }) 
  lang: string[];

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  createBy?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  updateBy?: string;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;

  @IsOptional()
  @IsString()
  deleteBy?: string;
}





