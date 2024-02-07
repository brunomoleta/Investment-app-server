import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token) as any;

    if (!decoded || !decoded.access_type) {
      return false;
    }
    const userRoles = decoded.access_type.split(',');

    return this.validateRoles(requiredRoles, userRoles);
  }

  validateRoles(roles: string[], userRoles: string[]) {
    console.log('VALIDATE ROLES', roles);
    return roles.some((role) => userRoles.includes(role));
  }
}
