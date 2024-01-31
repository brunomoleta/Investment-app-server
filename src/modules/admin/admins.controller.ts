import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { AdminsService } from './admins.service';


import { CreateAdminDto } from './dto/create-admin.dto';
import { StartSessionDto } from '../session/dto/start-session.dto';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }


}
