import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { CreateInvestorDto, InvestmentAmount } from './dto/create-investor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { decode } from 'jsonwebtoken';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { Investor } from './entities/investor.entity';
import { Constants } from '../../decorators/constants';

@ApiTags('investor')
@Controller('investor')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create investor.',
    description: 'User creates an investor account.',
  })
  @ApiCreatedResponse({
    description: 'Investor created successfully.',
    isArray: false,
    type: Investor,
  })
  @ApiBadRequestResponse({
    description: "Bad request. There's missing data",
    schema: {
      example: { message: Constants.MISSING_DATA },
    },
  })
  @ApiConflictResponse({
    description: Constants.EMAIL_RESPONSE,
    schema: {
      example: { message: Constants.EMAIL_RESPONSE },
    },
  })
  create(@Body() createInvestorDto: CreateInvestorDto) {
    return this.investorsService.create(createInvestorDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    description: 'Admin Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'List all investors with admin only access.',
    description: 'List all investors with all their related info.',
  })
  @ApiOkResponse({
    isArray: true,
    type: Investor,
    description: 'List investors',
  })
  @ApiUnauthorizedResponse({
    description: "It's necessary to give an admins token to list investors",
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @UseGuards(JwtGuard)
  findAll() {
    return this.investorsService.findAll();
  }

  @Get('advisor/:advisor_id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    description: 'Admin Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'Filter investors through their advisor.',
    description: 'Filter investors through their advisor.',
  })
  @ApiOkResponse({
    type: Investor,
    isArray: true,
    description: 'Filter investors through an advisor_id.',
  })
  @ApiNotFoundResponse({
    description: 'advisor_id sent was not found',
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
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  filterPerAdvisorId(@Param('advisor_id') advisor_id: string) {
    return this.investorsService.filterPerAdvisorId(advisor_id);
  }

  @Get('amount/:amount')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    description: 'Admin Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'Filter investors through their investment amount.',
    description: 'Filter investors through their investment amount.',
  })
  @ApiOkResponse({
    type: Investor,
    isArray: true,
    description: 'Filter investors through their investment amount.',
  })
  @ApiNotFoundResponse({
    description: 'This amount type does not exist.',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Only admins are allowed to perform this action.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @UseGuards(JwtGuard)
  filterPerAmount(@Param('advisor_id') amount: InvestmentAmount) {
    return this.investorsService.filterPerAmount(amount);
  }

  @Get('id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'Retrieve investor through their token.',
    description: 'Retrieve investor through their token.',
  })
  @ApiOkResponse({
    type: Investor,
    isArray: false,
    description: 'Retrieve an investor through the token',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only the investor or an admin user are allowed to perform this action.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.findById(decoded.sub);
  }

  @Patch()
  @ApiOperation({
    summary: "Update investor's info.",
    description:
      "Update investor's personal data through the token putting " +
      'partial information.',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOkResponse({
    type: Investor,
    description: 'Update investor data through their token',
  })
  @ApiUnauthorizedResponse({
    description: 'This user is not allowed to perform this action.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Please check the allowed data that can be sent to update the investor',
  })
  @UseGuards(JwtGuard)
  update(
    @Request() request: any,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.update(decoded.sub, updateInvestorDto);
  }

  @Patch('password')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOkResponse({
    type: Investor,
    description: "Update investor's password after validating his current one.",
  })
  @ApiOperation({
    summary: "Update investor's password.",
    description:
      "Update investor's password after validating his current one through the token",
  })
  @ApiBadRequestResponse({
    description:
      'New password has to use guidelines specified at update-password.dto',
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to set a valid token to update the advisor's password.",
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @ApiConflictResponse({
    description: 'Conflict. Invalid password.',
    schema: {
      example: { message: Constants.INVALIDP_RESPONSE },
    },
  })
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

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'Delete an investor.',
    description: 'Delete an investor through their token',
  })
  @ApiNoContentResponse({
    description: 'Deleted an investor through the token successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to set a admin token or the investor that owns the account token to remove the user.",
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.remove(decoded.sub);
  }
}
