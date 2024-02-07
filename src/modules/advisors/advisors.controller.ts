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
import { AdvisorsService } from './advisors.service';
import { CreateAdvisorDto, Experience } from './dto/create-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { RolesGuard } from '../../decorators/roles.guard';
import { Roles, UserRole } from '../../decorators/roles.decorator';

@Controller('advisor')
export class AdvisorsController {
  constructor(private readonly advisorsService: AdvisorsService) {}

  @Post()
  create(@Body() createAdvisorDto: CreateAdvisorDto) {
    return this.advisorsService.create(createAdvisorDto);
  }

  @Get('all')
  @Roles(UserRole.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  findAllAdminOnly() {
    return this.advisorsService.findAllAdminOnly();
  }

  @Get()
  findAllNoAuth() {
    return this.advisorsService.findAllNoAuth();
  }

  @Get(':speciality_id')
  filterPerSpecialityId(@Param('speciality_id') speciality_id: string) {
    return this.advisorsService.filterPerSpecialityId(speciality_id);
  }

  @Get(':experience')
  filterPerExperience(@Param('experience') experience: Experience) {
    return this.advisorsService.filterPerExperience(experience);
  }

  @Get(':email')
  @UseGuards(JwtGuard)
  findByEmail(@Param('email') email: string) {
    return this.advisorsService.findByEmail(email);
  }

  @Get(':id')
  @Roles(UserRole.Advisor, UserRole.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  findById(@Param('id') id: string) {
    return this.advisorsService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Advisor)
  @UseGuards(JwtGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    return this.advisorsService.update(id, updateAdvisorDto);
  }

  @HttpCode(204)
  @Roles(UserRole.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advisorsService.remove(id);
  }
}
