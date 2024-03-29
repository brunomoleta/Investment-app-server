import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Constants } from '../../../decorators/constants';

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
    example: Constants.INVESTMENT_NAME,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  type_name!: string;

  @ApiProperty({
    type: String,
    description: Constants.INVESTMENT_ERROR,
    example: Constants.INVESTMENT_RISK,
  })
  @IsNotEmpty()
  @IsEnum(Risk)
  risk: Risk = Risk.Low;
}
