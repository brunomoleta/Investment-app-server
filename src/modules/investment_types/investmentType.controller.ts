import {
  Body,
  Controller,
  Delete,
  Get,
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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InvestmentType } from './entities/investmentType.entity';
import { RetrieveAllInvestmentTypesDto } from './dto/get-all-investmentType.dto';
import { RetrieveInvestmentTypeDto } from './dto/retrieve-investmentType.dto';

@Controller('investment_type')
@ApiTags('investment_type')
export class InvestmentTypeController {
  constructor(private readonly investmentTypeService: InvestmentTypeService) {}

  @Post()
  @ApiCreatedResponse({
    type: InvestmentType,
    description: 'Successfully created an investment type.',
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to set a valid token to create an investment type.",
  })
  create(@Body() createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.investmentTypeService.create(createInvestmentTypeDto);
  }

  @Get('all')
  @ApiOkResponse({
    type: RetrieveAllInvestmentTypesDto,
    isArray: true,
    description:
      'List investment types with full information available only for authenticated users',
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to insert a admin token to list all investment types.",
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAllAdminOnly(@Req() request: Request) {
    return this.investmentTypeService.findAllAdminOnly(request);
  }

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: InvestmentType,
    description: 'List investment types accessible to all users.',
  })
  findAll(@Req() request: Request) {
    return this.investmentTypeService.findAll(request);
  }

  @Get('risk/:risk')
  @ApiOkResponse({
    type: InvestmentType,
    isArray: true,
    description: 'Filter investment types through their risk level.',
  })
  filteredByRisk(@Req() request: Request, @Param('risk') risk: Risk) {
    return this.investmentTypeService.filteredByRisk(request, risk);
  }

  @Get('id/:id')
  @ApiOkResponse({
    description: 'Retrieve investment type through its id.',
    type: RetrieveInvestmentTypeDto,
  })
  @ApiNotFoundResponse({
    description: 'Investment type id not found',
  })
  findById(@Param('id') id: string) {
    return this.investmentTypeService.findById(id);
  }

  @Patch('id/:id')
  @ApiOkResponse({
    type: InvestmentType,
    description: 'Update investment type through its id.',
  })
  @ApiNotFoundResponse({
    description: 'investment type id sent was not found',
  })
  @ApiUnauthorizedResponse({
    description: 'This user is not allowed to perform this action.',
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateInvestmentTypeDto: UpdateInvestmentTypeDto,
  ) {
    return this.investmentTypeService.update(id, updateInvestmentTypeDto);
  }

  @ApiNoContentResponse({
    description: 'Remove investment type through its id.',
  })
  @ApiNotFoundResponse({
    description: 'investment type id sent was not found',
  })
  @ApiUnauthorizedResponse({
    description: 'This user is not allowed to perform this action.',
  })
  @Delete('id/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.investmentTypeService.remove(id);
  }
}
