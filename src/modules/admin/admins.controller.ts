import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';

import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtGuard } from '../session/jwt.guard';
import { decode } from 'jsonwebtoken';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('id')
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.findById(decoded.sub);
  }

  @HttpCode(204)
  @Delete()
  @UseGuards(JwtGuard)
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.remove(decoded.sub);
  }
}
