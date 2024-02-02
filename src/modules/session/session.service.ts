import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { AdminsService } from '../admin/admins.service';
import { JwtService } from '@nestjs/jwt';
import { StartSessionDto } from './dto/start-session.dto';
import { compare } from 'bcryptjs';
import { InvestorsService } from '../investors/investors.service';
import { AdvisorsService } from '../advisors/advisors.service';


@Injectable()
export class SessionService {
  constructor(
    private readonly prisma: PrismaService,
    private adminService: AdminsService,
    private investorsService: InvestorsService,
    private advisorsService: AdvisorsService,
    private jwtService: JwtService,
  ) {
  }

  async login({ email, password, userType }: StartSessionDto & { userType: 'admin' | 'investor' | 'advisor' }) {
    let user;

    switch (userType) {
      case 'admin':
        user = await this.adminService.findByEmail(email);
        break;
      case 'investor':
        // you will need to create and inject InvestorsService
        user = await this.investorsService.findByEmail(email);
        break;
      case 'advisor':
        user = await this.advisorsService.findByEmail(email);
        break;
      default:
        throw new BadRequestException('Invalid user type');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: user.id,
      access_type: user.access_type,
    });


    return { token: token, access_type: user.access_type };
  }
}
