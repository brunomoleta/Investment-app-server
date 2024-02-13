import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateInvestmentTypeDto, Risk } from './dto/create-investmentType.dto';
import { InvestmentType } from './entities/investmentType.entity';
import { UpdateInvestmentTypeDto } from './dto/update-investmentType.dto';
import { RetrieveInvestmentTypes } from './investment_types';

@Injectable()
export class InvestmentTypeService {
  constructor(private readonly prisma: PrismaService) {}

  prepareResponse(
    investment_types: InvestmentType[],
    page: number,
  ): RetrieveInvestmentTypes {
    return {
      investment_types: plainToInstance(InvestmentType, investment_types),
      info: {
        page: Number(page),
        perPage: Number(investment_types.length),
      },
    };
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

  async findAll(request: any): Promise<RetrieveInvestmentTypes> {
    const { page = 1 } = request.query;
    const { paginationOptions } = request;

    const investment_types = await this.prisma.investmentType.findMany({
      select: {
        id: true,
        type_name: true,
        risk: true,
      },
      ...paginationOptions,
    });
    return this.prepareResponse(investment_types, page);
  }

  async findAllAdminOnly(request: any): Promise<RetrieveInvestmentTypes> {
    const { page = 1 } = request.query;
    const { paginationOptions } = request;
    const investment_types = await this.prisma.investmentType.findMany({
      select: {
        id: true,
        type_name: true,
        risk: true,

        advisors: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone_number: true,
            experience: true,
            created_at: true,
            investors: {
              select: {
                name: true,
                amount: true,
                created_at: true,
              },
            },
          },
        },
      },
      ...paginationOptions,
    });
    return this.prepareResponse(investment_types, page);
  }

  async filteredByRisk(
    request: any,
    risk: Risk,
  ): Promise<RetrieveInvestmentTypes> {
    const { page = 1 } = request.query;
    const { paginationOptions } = request;
    const filteredInvestmentTypes = await this.prisma.investmentType.findMany({
      where: { risk },
      select: {
        type_name: true,
        advisors: {
          select: {
            name: true,
            image: true,
            created_at: true,
            experience: true,
          },
        },
      },
      ...paginationOptions,
    });
    return this.prepareResponse(filteredInvestmentTypes, page);
  }

  async findByName(name: string) {
    const investment_type = await this.prisma.investmentType.findFirst({
      where: { type_name: name },
    });

    if (!investment_type)
      throw new NotFoundException("This investment_type's name was not found");

    return plainToInstance(InvestmentType, investment_type);
  }

  async findById(id: string) {
    const investment_type = await this.prisma.investmentType.findUnique({
      where: { id },
    });

    if (!investment_type)
      throw new NotFoundException('This investment_type was not found');

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

    if (!removeInvestment)
      throw new NotFoundException('This investment type was not found');

    await this.prisma.investmentType.delete({
      where: { id },
    });
  }
}
