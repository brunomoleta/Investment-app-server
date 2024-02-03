import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { CreateInvestorDto, InvestmentAmount } from './dto/create-investor.dto';
import { UpdateAdvisorDto } from '../advisors/dto/update-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { RolesGuard } from '../../decorators/roles.guard';
import { Roles, UserRole } from '../../decorators/roles.decorator';

@Controller('investor')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {
  }

  @Post()
  create(@Body() createInvestorDto: CreateInvestorDto) {
    return this.investorsService.create(createInvestorDto);
  }

  @Get()
  @Roles(UserRole.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  findAll() {
    return this.investorsService.findAll();
  }


  @Get("advisor_id")
  @Roles(UserRole.Admin, UserRole.Advisor)
  filterPerAdvisorId(@Param('advisor_id') advisor_id: string){
    return this.investorsService.filterPerAdvisorId(advisor_id)
  }

  @Get("amount")
  @Roles(UserRole.Admin)
  filterPerAmount(@Param('advisor_id') amount: InvestmentAmount){
    return this.investorsService.filterPerAmount(amount)
  }

  @UseGuards(JwtGuard)
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.investorsService.findByEmail(email);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.investorsService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Investor)
  @UseGuards(JwtGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    return this.investorsService.update(id, updateAdvisorDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @Roles(UserRole.Admin, UserRole.Investor)
  @UseGuards(JwtGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.investorsService.remove(id);
  }
}
