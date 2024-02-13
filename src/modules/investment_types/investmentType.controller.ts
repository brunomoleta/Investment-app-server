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
import { ApiResponse } from '@nestjs/swagger';

@Controller('investment_type')
export class InvestmentTypeController {
  constructor(private readonly investmentTypeService: InvestmentTypeService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create investment type.',
  })
  @UseGuards(JwtGuard)
  create(@Body() createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.investmentTypeService.create(createInvestmentTypeDto);
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    description:
      'List investment types with full information available only for authenticated users',
  })
  @UseGuards(JwtGuard)
  findAllAdminOnly(@Req() request: Request) {
    return this.investmentTypeService.findAllAdminOnly(request);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List investment types accessible to all users.',
  })
  findAll(@Req() request: Request) {
    return this.investmentTypeService.findAll(request);
  }

  @Get('risk/:risk')
  @ApiResponse({
    status: 200,
    description: 'Filter investment types through their risk level.',
  })
  filteredByRisk(@Req() request: Request, @Param('risk') risk: Risk) {
    return this.investmentTypeService.filteredByRisk(request, risk);
  }

  @Get('id/:id')
  @ApiResponse({
    status: 200,
    description: 'Retrieve investment type through its id.',
  })
  findById(@Param('id') id: string) {
    return this.investmentTypeService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update investment type through its id.',
  })
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: string,
    @Body() updateInvestmentTypeDto: UpdateInvestmentTypeDto,
  ) {
    return this.investmentTypeService.update(id, updateInvestmentTypeDto);
  }

  @HttpCode(204)
  @ApiResponse({
    status: 200,
    description: 'Remove investment type through its id.',
  })
  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.investmentTypeService.remove(id);
  }
}
