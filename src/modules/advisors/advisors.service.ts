import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Advisor } from './entities/advisor.entity';
import { PrismaService } from '../../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateAdvisorDto, Experience } from './dto/create-advisor.dto';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';

@Injectable()
export class AdvisorsService {
  constructor(private readonly prisma: PrismaService) {}

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
        'Please use a valid speciality. This one does not exist yet.',
      );
    }

    if (existingAdvisor) {
      throw new ConflictException('This advisor email already exists');
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

  async findAllAdminOnly() {
    const advisors = await this.prisma.advisor.findMany({
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
    });
    return plainToInstance(Advisor, advisors);
  }

  async findAllNoAuth() {
    const advisors = await this.prisma.advisor.findMany({
      select: {
        name: true,
        speciality: {
          select: {
            type_name: true,
          },
        },
        created_at: true,
        updated_at: true,
        experience: true,
        image: true,
      },
    });
    return plainToInstance(Advisor, advisors);
  }

  async filterPerSpecialityId(speciality_id: string) {
    const filteredAdvisors = await this.prisma.advisor.findMany({
      where: { speciality_id },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        experience: true,
        image: true,
      },
    });

    return plainToInstance(Advisor, filteredAdvisors);
  }
  async filterPerExperience(experience: Experience) {
    const filteredAdvisors = await this.prisma.advisor.findMany({
      where: { experience },
      select: {
        id: true,
        name: true,
        speciality: {
          select: {
            type_name: true,
          },
        },
        created_at: true,
        updated_at: true,
        image: true,
      },
    });

    return plainToInstance(Advisor, filteredAdvisors);
  }
  async findByEmail(email: string) {
    const advisor = await this.prisma.advisor.findUnique({
      where: { email },
    });

    if (!advisor)
      throw new NotFoundException("This advisor's email was not found");

    return advisor;
  }

  async findById(id: string) {
    const advisor = await this.prisma.advisor.findUnique({
      where: { id },
    });

    if (!advisor) throw new NotFoundException('This advisor was not found');

    return plainToInstance(Advisor, advisor);
  }

  async update(id: string, updateAdvisorDto: UpdateAdvisorDto) {
    const findAdvisor = await this.prisma.advisor.findUnique({
      where: { id },
    });

    if (!findAdvisor) {
      throw new NotFoundException('This advisor does not exists.');
    }

    if (updateAdvisorDto.email) {
      const emailExists = await this.prisma.advisor.findFirst({
        where: { email: updateAdvisorDto.email },
      });

      if (emailExists && emailExists.id !== id) {
        throw new ConflictException(
          'This email belongs to another user. Please try another one.',
        );
      }
    }

    const updatedAdvisor = await this.prisma.advisor.update({
      where: { id },
      data: updateAdvisorDto,
    });
    console.log(updatedAdvisor);

    return plainToInstance(Advisor, updatedAdvisor);
  }

  async remove(id: string) {
    const removeAdvisor = await this.prisma.advisor.findUnique({
      where: { id },
    });

    if (!removeAdvisor)
      throw new NotFoundException('This advisor was not found');

    await this.prisma.advisor.delete({
      where: { id },
    });
  }
}
