import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { Investor } from './entities/investor.entity';
import { UpdateInvestorDto } from './dto/update-investor.dto';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createInvestorDto: CreateInvestorDto) {
    const existingInvestor = await this.prisma.investor
      .findUnique({
        where: {
          email: createInvestorDto.email,
        },
      });
    if (existingInvestor) {
      throw new ConflictException('This email already exists');
    }

    const newInvestor = new Investor();
    Object.assign(newInvestor, createInvestorDto);

    await this.prisma.investor.create({
      data: {
        ...newInvestor,
        advisor: {
          connect: {
            id: createInvestorDto.advisor_id,
          },
        },
      },
    });

    return plainToInstance(Investor, newInvestor);
  }

  findAll() {
    const investors = this.prisma.investor.findMany();
    return plainToInstance(Investor, investors);
  }

  async findByEmail(email: string) {
    const advisor = await this.prisma.investor.findUnique({
      where: { email },
    });

    if (!advisor) throw new NotFoundException(
      'This advisor\'s email was not found',
    );

    return plainToInstance(Investor, advisor);
  }

  async findById(id: string) {
    const advisor = await this.prisma.investor.findUnique({
      where: { id },
    });

    if (!advisor) throw new NotFoundException(
      'This advisor was not found',
    );

    return plainToInstance(Investor, advisor);
  }

  async update(id: string, updateInvestorDto: UpdateInvestorDto) {
    const updatedInvestor = await this.prisma.investor.update({
      where: { id },
      data: updateInvestorDto,
    });

    return plainToInstance(Investor, updatedInvestor);
  }

  async remove(id: string) {
    const removeInvestor = await this.prisma.investor.findUnique({
      where: { id },
    });

    if (!removeInvestor) throw new NotFoundException(
      'This investor was not found',
    );

    await this.prisma.investor.delete(({
      where: { id },
    }));
  }
}