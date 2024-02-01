import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Advisor } from './entities/advisor.entity';
import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateAdvisorDto } from './dto/create-advisor.dto';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';


@Injectable()
export class AdvisorsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createAdvisorDto: CreateAdvisorDto) {
    const existingAdvisor = await this.prisma.advisor.findUnique({
      where: {
        email: createAdvisorDto.email,
      },
    });
    if (existingAdvisor) {
      throw new ConflictException('This advisor email already exists');
    }

    const newAdvisor = new Advisor();
    Object.assign(newAdvisor, createAdvisorDto);

    await this.prisma.advisor.create({
      data: {
        ...newAdvisor,
        speciality: {
          connect: {
            id: createAdvisorDto.speciality_id,
          },
        },
      },
    });

    return plainToInstance(Advisor, newAdvisor);
  }

  findAll() {
    const advisors = this.prisma.advisor.findMany();
    return plainToInstance(Advisor, advisors);
  }

  async findByEmail(email: string) {
    const advisor = await this.prisma.advisor.findUnique({
      where: { email },
    });

    if (!advisor) throw new NotFoundException(
      'This advisor\'s email was not found',
    );

    return plainToInstance(Advisor, advisor);
  }

  async findById(id: string) {
    const advisor = await this.prisma.advisor.findUnique({
      where: { id },
    });

    if (!advisor) throw new NotFoundException(
      'This advisor was not found',
    );

    return plainToInstance(Advisor, advisor);
  }

  async update(id: string, updateAdvisorDto: UpdateAdvisorDto) {
    const updatedAdvisor = await this.prisma.advisor.update({
      where: { id },
      data: updateAdvisorDto,
    });

    return plainToInstance(Advisor, updatedAdvisor);
  }

  async remove(id: string) {
    const removeAdvisor = await this.prisma.advisor.findUnique({
      where: { id },
    });

    if (!removeAdvisor) throw new NotFoundException(
      'This advisor was not found',
    );

    await this.prisma.advisor.delete(({
      where: { id },
    }));
  }
}