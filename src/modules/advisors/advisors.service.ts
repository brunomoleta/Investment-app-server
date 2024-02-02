import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

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
      throw new ConflictException('This email is already an advisor');
    }

    const existingSpeciality = await this.prisma.investmentType.findUnique({
      where: {
        id: createAdvisorDto.speciality_id,
      },
    });
    if (!existingSpeciality) {
      throw new NotFoundException(
        'Please use a valid speciality. This one does not exist yet.');
    }

    if (existingAdvisor) {
      throw new ConflictException(
        'This advisor email already exists');
    }

    const newAdvisor = new Advisor();
    Object.assign(newAdvisor, createAdvisorDto);

    const { speciality_id, ...advisorWithoutSpecialityId } = newAdvisor;

    await this.prisma.advisor.create({
      data: {
        ...advisorWithoutSpecialityId,
        speciality: {
          connect: {
            id: speciality_id,
          },
        },
      },
    });

    return plainToInstance(Advisor, newAdvisor);
  }

  findAllAdminOnly() {
    const advisors = this.prisma.advisor.findMany(
      {
        select: {
          id: true,
          name: true,
          email: true,
          phone_number: true,
          speciality: true,
          created_at: true,
          updated_at: true,
          experience: true,
          image: true,
          investors: {
            select: {
              id: true,
              name: true,
              email: true,
              amount: true,
              image: true,
              phone_number: true,
              created_at: true,
            },
          },
        },
      },
    );
    return plainToInstance(Advisor, advisors);
  }

  findAllNoAuth() {
    const advisors = this.prisma.advisor.findMany(
      {
        select: {
          name: true,
          email: true,
          speciality: true,
          created_at: true,
          updated_at: true,
          experience: true,
          image: true,
        },
      },
    );
    return plainToInstance(Advisor, advisors);
  }

  async findByEmail(email: string) {
    const advisor = await this.prisma.advisor.findUnique({
      where: { email },
    });

    if (!advisor) throw new NotFoundException(
      'This advisor\'s email was not found',
    );

    return advisor;
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