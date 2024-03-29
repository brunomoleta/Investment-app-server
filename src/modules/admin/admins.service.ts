import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

import { Admin } from './entities/admin.entity';
import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import * as bcrypt from 'bcryptjs';
import { Constants } from '../../decorators/constants';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin: Admin = await this.prisma.admin.findUnique({
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

    if (!admin)
      throw new NotFoundException("Admin's invalid email or password");

    return admin;
  }

  async findById(id: string): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) throw new NotFoundException('This admin was not found');

    return plainToInstance(Admin, admin);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException('This admin does not exist.');
    }

    const passwordMatch = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      admin.password,
    );

    if (!passwordMatch) {
      throw new ConflictException(Constants.INVALIDP_RESPONSE);
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    await this.prisma.admin.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { message: Constants.PASSWORD_OK_UPDATE };
  }

  async remove(id: string): Promise<void> {
    const removeAdmin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!removeAdmin) throw new NotFoundException('This admin was not found');

    await this.prisma.admin.delete({
      where: { id },
    });
  }
}
