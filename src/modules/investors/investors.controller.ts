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
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { Investor } from './entities/investor.entity';

@ApiTags('investor')
@Controller('investor')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Investor created successfully.',
    isArray: false,
    type: Investor,
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
  update(
    @Request() request: any,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.update(decoded.sub, updateInvestorDto);
  }

  @Patch('password')
  @ApiOkResponse({
    description: "Update investor's password after validating his current one.",
  })
  @ApiBadRequestResponse({
    description:
      'New password has to use guidelines specified at update-password.dto',
  })
  @ApiConflictResponse({
    description: 'Conflict. Invalid password.',
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

  @Delete()
  @ApiNoContentResponse({
    description: 'Deleted an investor through the token successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @UseGuards(JwtGuard)
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.investorsService.remove(decoded.sub);
  }
}
