import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Risk {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
  VeryHigh = 'very_high',
}

export class CreateInvestmentTypeDto {
  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  type_name!: string;

  @ApiProperty({
    type: String,
    description:
      "Required property. It can be either: 'low',\n" +
      ",'moderate',\n" +
      ",'high',\n" +
      "or 'very_high'.",
  })
  @IsNotEmpty()
  @IsEnum(Risk)
  risk: Risk = Risk.Low;
}
