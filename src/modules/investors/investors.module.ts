import { Module } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { PrismaService } from 'src/database/prisma.service';
import { InvestorsController } from './investors.controller';

@Module({
  controllers: [InvestorsController],
  providers: [InvestorsService, PrismaService],
  exports: [InvestorsService]
})
export class InvestorsModule {}
