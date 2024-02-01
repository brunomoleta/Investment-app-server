import { Controller, Get, Post, Body, Param, Delete, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { AdvisorsService } from './advisors.service';
import { CreateAdvisorDto } from './dto/create-advisor.dto';
// import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';


@Controller('advisor')
export class AdvisorsController {
  constructor(private readonly advisorsService: AdvisorsService) {
  }

  @Post()
  create(@Body() createAdvisorDto: CreateAdvisorDto) {
    return this.advisorsService.create(createAdvisorDto);
  }

  @Get()
  findAll() {
    return this.advisorsService.findAll();
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
