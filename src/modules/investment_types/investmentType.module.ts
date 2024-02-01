import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { InvestmentTypeService } from './investmentType.service';
import { InvestmentTypeController } from './investmentType.controller';

@Module({
  controllers: [InvestmentTypeController],
  providers: [InvestmentTypeService, PrismaService],
  exports: [InvestmentTypeService],
})
export class InvestmentTypeModule {
}
