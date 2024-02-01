import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';


enum InvestmentAmount {
  Starter = 'starter',
  WellRounded = 'well-rounded',
  Multimillionaire = 'multimillionaire',
  Wealthy = 'wealthy'
}

export class CreateInvestorDto extends CreateUserDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InvestmentAmount)

  amount: InvestmentAmount = InvestmentAmount.Starter;

  advisor_id!: string
}