import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

enum Risk {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
  VeryHigh = 'very_high'
}

export class CreateInvestmentTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  type_name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Risk)
  risk: Risk = Risk.Low
}