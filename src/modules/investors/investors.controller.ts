import { Controller, Get, Post, Body, Param, Delete, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateAdvisorDto } from '../advisors/dto/update-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';

@Controller('investor')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {
  }

  @Post()
  create(@Body() createInvestorDto: CreateInvestorDto) {
    return this.investorsService.create(createInvestorDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.investorsService.findAll();
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

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    return this.investorsService.update(id, updateAdvisorDto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorsService.remove(id);
  }
}
