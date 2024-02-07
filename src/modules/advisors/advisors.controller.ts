import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdvisorsService } from './advisors.service';
import { CreateAdvisorDto, Experience } from './dto/create-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { decode } from 'jsonwebtoken';

@Controller('advisor')
export class AdvisorsController {
  constructor(private readonly advisorsService: AdvisorsService) {}

  @Post()
  create(@Body() createAdvisorDto: CreateAdvisorDto) {
    return this.advisorsService.create(createAdvisorDto);
  }

  @Get('all')
  @UseGuards(JwtGuard)
  findAllAdminOnly() {
    return this.advisorsService.findAllAdminOnly();
  }

  @Get()
  findAllNoAuth() {
    return this.advisorsService.findAllNoAuth();
  }

  @Get('experience/:speciality_id')
  filterPerSpecialityId(@Param('speciality_id') speciality_id: string) {
    return this.advisorsService.filterPerSpecialityId(speciality_id);
  }

  @Get('experience/:experience')
  filterPerExperience(@Param('experience') experience: Experience) {
    return this.advisorsService.filterPerExperience(experience);
  }

  @Get('id')
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.findById(decoded.sub);
  }

  @Patch()
  @UseGuards(JwtGuard)
  update(@Request() request: any, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.update(decoded.sub, updateAdvisorDto);
  }

  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Delete()
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.remove(decoded.sub);
  }
}
