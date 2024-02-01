import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Passport } from 'passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { JwtStrategy } from './jwt.strategy';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { AdminsService } from '../admin/admins.service';

@Module({
  imports: [
    Passport,
    JwtModule.register(
      {
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '200d' },
      },
    ),
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    AdminsService,
    PrismaService,
    JwtStrategy,
  ]
})

export class SessionModule {

}
