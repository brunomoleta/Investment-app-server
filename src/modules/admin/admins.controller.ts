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
import { ApiResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create admin',
  })
  @UseGuards(JwtGuard)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List admins',
  })
  @UseGuards(JwtGuard)
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('id')
  @ApiResponse({
    status: 200,
    description: 'Get specific admin through the token',
  })
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.findById(decoded.sub);
  }

  @HttpCode(204)
  @Delete()
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 204,
    description: 'Remove specific admin through the token',
  })
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.remove(decoded.sub);
  }
}
