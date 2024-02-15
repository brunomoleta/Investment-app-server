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
import { ApiResponse } from '@nestjs/swagger';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';

@Controller('investor')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create investor.',
  })
  create(@Body() createInvestorDto: CreateInvestorDto) {
    return this.investorsService.create(createInvestorDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List investors',
  })
  @UseGuards(JwtGuard)
  findAll() {
    return this.investorsService.findAll();
  }

  @Get('advisor/:advisor_id')
  @ApiResponse({
    status: 200,
    description: 'Filter investors through a advisor_id.',
  })
  @UseGuards(JwtGuard)
  filterPerAdvisorId(@Param('advisor_id') advisor_id: string) {
    return this.investorsService.filterPerAdvisorId(advisor_id);
  }

  @Get('amount/:amount')
  @ApiResponse({
    status: 200,
    description: 'Filter investors through their investment amount.',
  })
  @UseGuards(JwtGuard)
  filterPerAmount(@Param('advisor_id') amount: InvestmentAmount) {
    return this.investorsService.filterPerAmount(amount);
  }

  @Get('id')
  @ApiResponse({
    status: 200,
    description: 'Remove specific investor through the token',
  })
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.findById(decoded.sub);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Update specific investor through the token',
  })
  @UseGuards(JwtGuard)
  update(@Request() request: any, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.update(decoded.sub, updateAdvisorDto);
  }

  @Patch('password')
  @ApiResponse({
    status: 200,
    description: "Update investor's password after validating his current.",
  })
  @UseGuards(JwtGuard)
  async changePassword(
    @Request() request: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return await this.investorsService.updatePassword(
      decoded.sub,
      updatePasswordDto,
    );
  }

  @HttpCode(204)
  @Delete()
  @ApiResponse({
    status: 204,
    description: 'Remove specific investor through the token',
  })
  @UseGuards(JwtGuard)
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.remove(decoded.sub);
  }
}
