import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';


import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtGuard } from '../session/jwt.guard';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.adminsService.findByEmail(email);
  }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
