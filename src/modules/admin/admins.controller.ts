import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';

import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtGuard } from '../session/jwt.guard';
import { decode } from 'jsonwebtoken';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { Admin } from './entities/admin.entity';

@Controller('admin')
@ApiTags('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Admin created successfully',
    isArray: false,
    type: Admin,
  })
  @ApiConflictResponse({
    description: 'This email already exists',
  })
  @UseGuards(JwtGuard)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'List admins',
    type: Admin,
    isArray: true,
  })
  @UseGuards(JwtGuard)
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('id')
  @ApiOkResponse({
    isArray: false,
    description: 'Get specific admin through the token',
    type: Admin,
  })
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.findById(decoded.sub);
  }

  @Patch('password')
  @ApiResponse({
    status: 200,
    description: "Update admin's password after validating his current one.",
  })
  @UseGuards(JwtGuard)
  async changePassword(
    @Request() request: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return await this.adminsService.updatePassword(
      decoded.sub,
      updatePasswordDto,
    );
  }

  @Delete()
  @UseGuards(JwtGuard)
  @ApiNoContentResponse({
    description: 'Deleted an admin through the token successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.remove(decoded.sub);
  }
}
