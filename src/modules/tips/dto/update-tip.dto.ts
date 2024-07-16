import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTipDto } from './create-tip.dto';

export class UpdateTipDto extends PartialType(CreateTipDto) {
  @ApiProperty({
    description: 'Date and time when the tip was last updated',
    example: '2023-01-02T00:00:00Z',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;

  @ApiProperty({
    description: 'User who last updated the tip',
    example: 'admin',
  })
  @IsString()
  @IsOptional()
  updateBy?: string;

  @ApiProperty({
    description: 'Date and time when the tip was deleted',
    example: '2023-01-03T00:00:00Z',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deletedAt?: Date;

  @ApiProperty({
    description: 'User who deleted the tip',
    example: 'admin',
  })
  @IsString()
  @IsOptional()
  deleteBy?: string;
}
