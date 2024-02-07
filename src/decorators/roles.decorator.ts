import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  Admin = 'admin',
  Advisor = 'advisor',
  Investor = 'investor',
}

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
