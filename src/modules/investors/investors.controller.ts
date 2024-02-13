import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { CreateInvestorDto, InvestmentAmount } from './dto/create-investor.dto';
import { UpdateAdvisorDto } from '../advisors/dto/update-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { decode } from 'jsonwebtoken';

@Controller('investor')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @Post()
  create(@Body() createInvestorDto: CreateInvestorDto) {
    return this.investorsService.create(createInvestorDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.investorsService.findAll();
  }

  @Get('advisor/:advisor_id')
  filterPerAdvisorId(@Param('advisor_id') advisor_id: string) {
    return this.investorsService.filterPerAdvisorId(advisor_id);
  }

  @Get('amount/:amount')
  filterPerAmount(@Param('advisor_id') amount: InvestmentAmount) {
    return this.investorsService.filterPerAmount(amount);
  }

  @Get('id')
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.findById(decoded.sub);
  }

  @Patch()
  @UseGuards(JwtGuard)
  update(@Request() request: any, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.update(decoded.sub, updateAdvisorDto);
  }

  @HttpCode(204)
  @Delete()
  @UseGuards(JwtGuard)
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.remove(decoded.sub);
  }
}
