import { CreateAdvisorDto } from './create-advisor.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAdvisorDto extends PartialType(CreateAdvisorDto) {}
