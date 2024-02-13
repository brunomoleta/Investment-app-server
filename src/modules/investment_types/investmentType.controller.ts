import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../session/jwt.guard';
import { InvestmentTypeService } from './investmentType.service';
import { CreateInvestmentTypeDto, Risk } from './dto/create-investmentType.dto';
import { UpdateInvestmentTypeDto } from './dto/update-investmentType.dto';

@Controller('investment_type')
export class InvestmentTypeController {
  constructor(private readonly investmentTypeService: InvestmentTypeService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.investmentTypeService.create(createInvestmentTypeDto);
  }

  @Get('all')
  @UseGuards(JwtGuard)
  findAllAdminOnly(@Req() request: Request) {
    return this.investmentTypeService.findAllAdminOnly(request);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.investmentTypeService.findAll(request);
  }

  @Get('risk/:risk')
  filteredByRisk(@Req() request: Request, @Param('risk') risk: Risk) {
    return this.investmentTypeService.filteredByRisk(request, risk);
  }

  @Get('name/:name')
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
