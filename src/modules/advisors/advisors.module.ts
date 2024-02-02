import { Module } from '@nestjs/common';
import { AdvisorsService } from './advisors.service';
import { PrismaService } from 'src/database/prisma.service';
import { AdvisorsController } from './advisors.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdvisorsController],
  providers: [AdvisorsService, PrismaService, JwtService],
  exports: [AdvisorsService],

})
export class AdvisorsModule {
}
