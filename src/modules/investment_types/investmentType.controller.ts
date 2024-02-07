import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../session/jwt.guard';
import { InvestmentTypeService } from './investmentType.service';
import { CreateInvestmentTypeDto, Risk } from './dto/create-investmentType.dto';
import { UpdateInvestmentTypeDto } from './dto/update-investmentType.dto';

@Controller('type')
export class InvestmentTypeController {
  constructor(private readonly investmentTypeService: InvestmentTypeService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.investmentTypeService.create(createInvestmentTypeDto);
  }

  @Get('all')
  @UseGuards(JwtGuard)
  findAllAdminOnly() {
    return this.investmentTypeService.findAllAdminOnly();
  }

  @Get()
  findAll() {
    return this.investmentTypeService.findAll();
  }

  @Get(':risk')
  filteredByRisk(@Param('risk') risk: Risk) {
    return this.investmentTypeService.filteredByRisk(risk);
  }

  @Get(':name')
  findByName(@Param('name') type_name: string) {
    return this.investmentTypeService.findByName(type_name);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.investmentTypeService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: string,
    @Body() updateInvestmentTypeDto: UpdateInvestmentTypeDto,
  ) {
    return this.investmentTypeService.update(id, updateInvestmentTypeDto);
  }

  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentTypeService.remove(id);
  }
}
