import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../session/jwt.guard';
import { InvestmentTypeService } from './investmentType.service';
import { CreateInvestmentTypeDto } from './dto/create-investmentType.dto';


@Controller('type')
export class InvestmentTypeController {
  constructor(private readonly investmentTypeService: InvestmentTypeService) {
  }

  @Post()
  create(@Body() createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.investmentTypeService.create(createInvestmentTypeDto);
  }

  @Get()
  findAll() {
    return this.investmentTypeService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':name')
  findByName(@Param('name') type_name: string) {
    return this.investmentTypeService.findByName(type_name);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.investmentTypeService.findById(id);
  }

  // @UseGuards(JwtGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdvisorDto: UpdateAdvisorDto) {
  //   return this.investmentTypeService.update(id, updateAdvisorDto);
  // }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentTypeService.remove(id);
  }


}
