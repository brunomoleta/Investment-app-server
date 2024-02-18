import { InvestmentAmount } from './create-investor.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateInvestorDto extends UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    description:
      "Optional property. It has to be one of the following: 'starter',\n" +
      "'well-rounded',\n" +
      "'multimillionaire',\n" +
      "or 'wealthy'",
  })
  @IsNotEmpty()
  @IsEnum(InvestmentAmount)
  amount?: InvestmentAmount;

  @ApiPropertyOptional({
    type: String,
    description:
      'Optional property. It has to be one of the existing advisor_id.',
  })
  @IsNotEmpty()
  @IsString()
  advisor_id?: string;
}
