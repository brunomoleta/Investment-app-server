import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { PrismaService } from 'src/database/prisma.service';
import { AdminsController } from './admins.controller';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService],
  exports: [AdminsService],
})
export class AdminsModule {}
