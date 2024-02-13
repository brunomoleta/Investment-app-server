import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { Investor } from './entities/investor.entity';
import { UpdateInvestorDto } from './dto/update-investor.dto';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvestorDto: CreateInvestorDto) {
    const existingInvestor = await this.prisma.investor.findUnique({
      where: {
        email: createInvestorDto.email,
      },
    });
    if (existingInvestor) {
      throw new ConflictException('This email is already an investor');
    }

    const existingAdvisor = await this.prisma.advisor.findFirst({
      where: {
        id: createInvestorDto.advisor_id,
      },
    });
    if (!existingAdvisor) {
      throw new NotFoundException(
        'Please use a valid advisor. This one does not exist yet.',
      );
    }
    const newInvestor = new Investor();
    Object.assign(newInvestor, createInvestorDto);

    const { advisor_id, ...investorWithoutAdvisorId } = newInvestor;

    await this.prisma.investor.create({
      data: {
        ...investorWithoutAdvisorId,
        advisor: {
          connect: {
            id: advisor_id,
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

  async filterPerAdvisorId(advisor_id: string) {
    const investors = await this.prisma.investor.findMany({
      where: { advisor_id },
      select: {
        id: true,
        name: true,
        image: true,
        amount: true,
        email: true,
        created_at: true,
      },
    });

    return plainToInstance(Investor, investors);
  }

  async filterPerAmount(amount: string) {
    const investors = await this.prisma.investor.findMany({
      where: { amount },
      select: {
        id: true,
        name: true,
        image: true,
        amount: true,
        email: true,
        created_at: true,
      },
    });

    return plainToInstance(Investor, investors);
  }

  async findByEmail(email: string) {
    const investor = await this.prisma.investor.findUnique({
      where: { email },
    });

    if (!investor)
      throw new NotFoundException("This investors's email was not found");

    return investor;
  }

  async findById(id: string) {
    const investor = await this.prisma.investor.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone_number: true,
        image: true,
        amount: true,
        email: true,
        created_at: true,
        advisor: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
          },
        },
      },
    });

    if (!investor) throw new NotFoundException('This investor was not found');

    return plainToInstance(Investor, investor);
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

    if (!removeInvestor)
      throw new NotFoundException('This investor was not found');

    await this.prisma.investor.delete({
      where: { id },
    });
  }
}
