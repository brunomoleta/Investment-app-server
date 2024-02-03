import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { InvestmentTypeService } from './investmentType.service';
import { InvestmentTypeController } from './investmentType.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InvestmentTypeController],
  providers: [InvestmentTypeService, PrismaService, JwtService],
  exports: [InvestmentTypeService],
})
export class InvestmentTypeModule {
}
