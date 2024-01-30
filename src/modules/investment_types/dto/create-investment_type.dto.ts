import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

enum Risk {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}

export class CreateInvestmentTypeDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Risk)
  risk: Risk = Risk.Low
}