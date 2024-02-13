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
import { AdvisorsService } from './advisors.service';
import { CreateAdvisorDto, Experience } from './dto/create-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { decode } from 'jsonwebtoken';
import { RetrieveAdvisors } from './advisors';
import { ApiResponse } from '@nestjs/swagger';

@Controller('advisor')
export class AdvisorsController {
  constructor(private readonly advisorsService: AdvisorsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create advisor with all the info.',
  })
  create(@Body() createAdvisorDto: CreateAdvisorDto) {
    return this.advisorsService.create(createAdvisorDto);
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'Get advisors with all the info.',
  })
  @UseGuards(JwtGuard)
  findAllAdminOnly(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllAdminOnly(request);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get advisors',
  })
  findAllNoAuth(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllNoAuth(request);
  }

  @Get('speciality_id/:speciality_id')
  @ApiResponse({
    status: 200,
    description: 'Filter advisors through their speciality.',
  })
  filterPerSpecialityId(
    @Req() request: Request,
    @Param('speciality_id') speciality_id: string,
  ) {
    return this.advisorsService.filterPerSpecialityId(request, speciality_id);
  }

  @Get('experience/:experience')
  @ApiResponse({
    status: 200,
    description: 'Filter advisors through their experience level.',
  })
  filterPerExperience(
    @Req() request: Request,
    @Param('experience') experience: Experience,
  ) {
    return this.advisorsService.filterPerExperience(request, experience);
  }

  @Get('id')
  @ApiResponse({
    status: 200,
    description: 'Retrieve advisor through the token',
  })
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.findById(decoded.sub);
  }

  @Patch()
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 200,
    description: 'Update specific advisor through the token',
  })
  update(@Request() request: any, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.update(decoded.sub, updateAdvisorDto);
  }

  @HttpCode(204)
  @Delete()
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 204,
    description: 'Remove specific advisor through the token',
  })
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.remove(decoded.sub);
  }
}
