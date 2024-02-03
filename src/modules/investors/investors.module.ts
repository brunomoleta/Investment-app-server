import { Module } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { PrismaService } from 'src/database/prisma.service';
import { InvestorsController } from './investors.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InvestorsController],
  providers: [InvestorsService, PrismaService, JwtService],
  exports: [InvestorsService]
})
export class InvestorsModule {}
