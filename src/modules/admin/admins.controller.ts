import {
  Body,
  Controller,
  Delete,
  Get,
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
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { Admin } from './entities/admin.entity';
import { Constants } from '../../decorators/constants';

@Controller('admin')
@ApiTags('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create admin.',
    description: 'Admin users can sign up an admin.',
  })
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiUnauthorizedResponse({
    description: 'Only admin users can create a new admin.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @ApiCreatedResponse({
    description: 'Admin created successfully',
    isArray: false,
    type: Admin,
  })
  @ApiConflictResponse({
    description: Constants.EMAIL_RESPONSE,
    schema: {
      example: { message: Constants.EMAIL_RESPONSE },
    },
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List admins.',
    description: 'Admin users can list all admin users.',
  })
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOkResponse({
    description: 'Listed admins successfully',
    type: Admin,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Only admin users can list the admins array.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retrieve an admin.',
    description: 'Admin users can retrieve other admin users by id.',
  })
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiOkResponse({
    isArray: false,
    description: 'Get specific admin through the token.',
    type: Admin,
  })
  @ApiNotFoundResponse({
    description: Constants.NOTFOUND_RESPONSE,
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Only admin users can retrieve an admin.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.findById(decoded.sub);
  }

  @Patch('password')
  @ApiOperation({
    summary: "Patch admin's password.",
    description:
      'Authorized admin can patch their password after submitting the current one.',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @ApiUnauthorizedResponse({
    description: 'Only the logged in admin can updated their password.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  @ApiConflictResponse({
    description: Constants.INVALIDP_RESPONSE,
    schema: {
      example: { message: Constants.INVALIDP_RESPONSE },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: { message: Constants.PASSWORD_OK_RESPONSE },
    },
    description: "Update admin's password after validating his current one.",
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete admin.',
    description: 'Authorized admin can delete their own account.',
  })
  @ApiHeader({
    name: 'token',
    description: 'Auth token',
    required: true,
    schema: { type: 'string' },
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Deleted an admin through the token successfully.',
  })
  @ApiNotFoundResponse({
    description: Constants.NOTFOUND_RESPONSE,
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Only the logged in admin can delete their password.',
    schema: {
      example: { message: Constants.UNAUTHORIZED_RESPONSE },
    },
  })
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.adminsService.remove(decoded.sub);
  }
}
