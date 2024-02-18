import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentTypeDto, Risk } from './create-investmentType.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateInvestmentTypeDto extends PartialType(
  CreateInvestmentTypeDto,
) {
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  type_name?: string;

  @ApiPropertyOptional({
    type: String,
    description:
      "Optional property. If sent should be either: 'low',\n" +
      ",'moderate',\n" +
      ",'high',\n" +
      "or 'very_high'.",
  })
  @IsEnum(Risk)
  risk?: Risk;
}
