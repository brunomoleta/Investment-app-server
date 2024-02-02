import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

import { Admin } from './entities/admin.entity';
import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: {
        email: createAdminDto.email,
      },
    });
    if (existingAdmin) {
      throw new ConflictException('Admin already exists');
    }

    const newAdmin = new Admin();
    Object.assign(newAdmin, createAdminDto);

    await this.prisma.admin.create({
      data: { ...newAdmin },
    });

    return plainToInstance(Admin, newAdmin);
  }


  findAll() {
    const admins = this.prisma.admin.findMany();
    return plainToInstance(Admin, admins);
  }

  async findByEmail(email: string) {
    const admin = await this.prisma.admin.findFirst({
      where: { email },
    });

    if (!admin) throw new NotFoundException(
      "This admin's email was not found",
    );

    return admin;
  }


  async remove(id: string) {
    const removeAdmin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!removeAdmin) throw new NotFoundException(
      'This admin was not found'
    );

    await this.prisma.admin.delete(({
      where: { id },
    }));
  }
}