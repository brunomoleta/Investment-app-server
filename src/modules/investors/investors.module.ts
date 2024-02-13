import { Module } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { PrismaService } from 'src/database/prisma.service';
import { InvestorsController } from './investors.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../../decorators/roles.guard';

@Module({
  controllers: [InvestorsController],
  providers: [InvestorsService, PrismaService, JwtService, RolesGuard],
  exports: [InvestorsService],
})
export class InvestorsModule {}
