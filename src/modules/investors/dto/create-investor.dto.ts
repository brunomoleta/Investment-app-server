import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Constants } from '../../../decorators/constants';

export enum InvestmentAmount {
  Starter = 'starter',
  WellRounded = 'well-rounded',
  Multimillionaire = 'multimillionaire',
  Wealthy = 'wealthy',
}

export class CreateInvestorDto extends CreateUserDto {
  @ApiProperty({
    type: String,
    description:
      "Required property. It has to be one of the following: 'starter',\n" +
      "'well-rounded',\n" +
      "'multimillionaire',\n" +
      "or 'wealthy'",
    example: 'starter',
  })
  @IsNotEmpty()
  @IsEnum(InvestmentAmount)
  amount: InvestmentAmount = InvestmentAmount.Starter;

  @ApiProperty({
    type: String,
    description:
      'Required property. It has to be one of the existing advisor_id.',
    example: Constants.USER_ID,
  })
  @IsNotEmpty()
  @IsString()
  advisor_id!: string;
}
