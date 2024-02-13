import { Module } from '@nestjs/common';
import { AdvisorsService } from './advisors.service';
import { PrismaService } from 'src/database/prisma.service';
import { AdvisorsController } from './advisors.controller';

@Module({
  controllers: [AdvisorsController],
  providers: [AdvisorsService, PrismaService],
  exports: [AdvisorsService],
})
export class AdvisorsModule {}
