import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';


import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateInvestmentTypeDto } from './dto/create-investmentType.dto';
import { InvestmentType } from './entities/investmentType.entity';
import { UpdateInvestmentTypeDto } from './dto/update-investmentType.dto';

@Injectable()
export class InvestmentTypeService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createInvestmentTypeDto: CreateInvestmentTypeDto) {
    const existingInvestment = await this.prisma.investmentType.findFirst({
      where: {
        type_name: createInvestmentTypeDto.type_name,
      },
    });

    if (existingInvestment) {
      throw new ConflictException('This investment type already exists');
    }

    const newInvestmentType = await this.prisma.investmentType.create({
      data: {
        type_name: createInvestmentTypeDto.type_name.toLowerCase(),
        risk: createInvestmentTypeDto.risk.toLowerCase(),
      },
    });

    return plainToInstance(InvestmentType, newInvestmentType);
  }

  findAll() {
    const investment_types = this.prisma.investmentType.findMany();
    return plainToInstance(InvestmentType, investment_types);
  }

  async findByName(name: string) {
    const investment_type = await this.prisma.investmentType.findFirst({
      where: { type_name: name },
    });

    if (!investment_type) throw new NotFoundException(
      'This investment_type\'s name was not found',
    );

    return plainToInstance(InvestmentType, investment_type);
  }

  async findById(id: string) {
    const investment_type = await this.prisma.investmentType.findUnique({
      where: { id },
    });

    if (!investment_type) throw new NotFoundException(
      'This investment_type was not found',
    );

    return plainToInstance(InvestmentType, investment_type);
  }

  async update(id: string, updateInvestmentTypeDto: UpdateInvestmentTypeDto) {
    const updatedInvestmentType = await this.prisma.investmentType.update({
      where: { id },
      data: updateInvestmentTypeDto,
    });

    return plainToInstance(InvestmentType, updatedInvestmentType);
  }

  async remove(id: string) {
    const removeInvestment = await this.prisma.investmentType.findUnique({
      where: { id },
    });

    if (!removeInvestment) throw new NotFoundException(
      'This investment type was not found',
    );

    await this.prisma.investmentType.delete(({
      where: { id },
    }));
  }
}