import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ISession } from '../modules/session/session.service';

@Injectable()
export class TokenDecoder {
  constructor(private jwtService: JwtService) {}

  decodeTokenFromContext(request: any): ISession {
    const token = request.headers.authorization.split(' ')[1];
    return this.jwtService.decode(token);
  }
}
