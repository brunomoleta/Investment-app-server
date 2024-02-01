import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { AdminsService } from '../admin/admins.service';
import { JwtService } from '@nestjs/jwt';
import { StartSessionDto } from './dto/start-session.dto';
import { compare } from 'bcryptjs';


@Injectable()
export class SessionService {
  constructor(
    private readonly prisma: PrismaService,
    private adminService: AdminsService,
    private jwtService: JwtService,
  ) {
  }

  async login({ email, password }: StartSessionDto) {
    if (!email || !password) {
      throw new BadRequestException(
        'Email and password must be provided');
    }

    const admin = await this.adminService.findByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordMatch = await compare(password, admin.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign(
      { email, id: admin.id });
    return { token };
  }
}