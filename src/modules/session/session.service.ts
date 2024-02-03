import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { AdminsService } from '../admin/admins.service';
import { JwtService } from '@nestjs/jwt';
import { StartSessionDto } from './dto/start-session.dto';
import { compare } from 'bcryptjs';
import { InvestorsService } from '../investors/investors.service';
import { AdvisorsService } from '../advisors/advisors.service';
import { UserRole } from '../../decorators/roles.decorator';

export interface ISession {
  id: string;
  access_type: UserRole;
}

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

  async login({ email, password, userType }: StartSessionDto & {
    userType: UserRole.Admin | UserRole.Advisor | UserRole.Investor
  }) {
    let user;

    switch (userType) {
      case UserRole.Admin:
        user = await this.adminService.findByEmail(email);
        break;
      case UserRole.Investor:
        user = await this.investorsService.findByEmail(email);
        break;
      case UserRole.Advisor:
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

    console.log('USERRRRRRRRRRRRRRRRRRRRR', user);
    const token = this.jwtService.sign({});
    console.log(token);

    return { token: token };
  }
}
