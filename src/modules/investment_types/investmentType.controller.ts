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
import { CreateInvestmentTypeDto } from './dto/create-investmentType.dto';
import { UpdateInvestmentTypeDto } from './dto/update-investmentType.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InvestmentType } from './entities/investmentType.entity';
import { RetrieveInvestmentTypeDto } from './dto/retrieve-investmentType.dto';
import { Constants } from '../../decorators/constants';

@Controller('investment_type')
@ApiTags('investment_type')
export class InvestmentTypeController {
  constructor(private readonly investmentTypeService: InvestmentTypeService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create an investment type.',
    description: 'Create an investment type as a Admin or Advisor user.',
  })
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiCreatedResponse({
    type: InvestmentType,
    description: 'Successfully created an investment type.',
  })
  @ApiUnauthorizedResponse({
    description: 'Only admins or advisors can create an investment type.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Please check the create-investmentType.dto to make the correct request',
    schema: {
      example: { message: Constants.INVESTMENT_ERROR },
    },
  })
  create(@Body() createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.investmentTypeService.create(createInvestmentTypeDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List investment types.',
    description:
      'List investment types with full info connected to them. Only for admin.',
  })
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    type: InvestmentType,
    isArray: true,
    description:
      'List investment types with full information available only for authenticated users',
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to insert a admin token to list investment types with full info.",
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  findAllAdminOnly(@Req() request: Request) {
    return this.investmentTypeService.findAllAdminOnly(request);
  }

  @Get()
  @ApiOperation({
    summary: 'List investment types.',
    description: 'List investment types with basic info.',
  })
  @ApiOkResponse({
    isArray: true,
    type: InvestmentType,
    description: 'List investment types accessible to all users.',
  })
  findAll(@Req() request: Request) {
    return this.investmentTypeService.findAll(request);
  }

  @Get('risk/:risk')
  @ApiOperation({
    summary: 'Filter investment types by their Risk.',
    description: 'Filter investment types by their Risk.',
  })
  @ApiOkResponse({
    type: InvestmentType,
    isArray: true,
    description: 'Filter investment types through their risk level.',
  })
  @ApiNotFoundResponse({
    description: 'This Risk type was not found.',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @Get('id/:id')
  @ApiOkResponse({
    description: 'Retrieve investment type through its id.',
    type: RetrieveInvestmentTypeDto,
  })
  @ApiNotFoundResponse({
    description: 'This Investment type id not found',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  findById(@Param('id') id: string) {
    return this.investmentTypeService.findById(id);
  }

  @Patch('id/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'Update an investment type.',
    description: 'Update an investment type with advisor or admin token.',
  })
  @ApiOkResponse({
    type: InvestmentType,
    description: 'Update investment type through its id.',
  })
  @ApiNotFoundResponse({
    description: 'Investment type id sent was not found',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      'Only advisor or admin users are allowed to perform this action.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
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
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'This user is not allowed to perform this action.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @Delete('id/:id')
  @UseGuards(JwtGuard)
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete an investment type.',
    description: 'Delete an investment type as an advisor or admin user.',
  })
  @ApiOkResponse({
    description: 'Deleted advisor through the token successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to be a advisor or admin user to remove an investment type.",
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  remove(@Param('id') id: string) {
    return this.investmentTypeService.remove(id);
  }
}
