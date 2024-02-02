import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdvisorsService } from './advisors.service';
import { CreateAdvisorDto } from './dto/create-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { RolesGuard } from '../../decorators/roles.guard';
import { Roles, UserRole } from '../../decorators/roles.decorator';


@Controller('advisor')
export class AdvisorsController {
  constructor(private readonly advisorsService: AdvisorsService) {
  }

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

  @UseGuards(JwtGuard)
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.advisorsService.findByEmail(email);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.advisorsService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    return this.advisorsService.update(id, updateAdvisorDto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advisorsService.remove(id);
  }
}
