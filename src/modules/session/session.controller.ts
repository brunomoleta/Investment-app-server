import { Controller, Get, Post, Body, Param, Delete, HttpCode, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { StartSessionDto } from './dto/start-session.dto';

@ApiTags('login')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {
  }

  @Post()
  async login(@Body() admin: StartSessionDto){
    return this.sessionService.login(admin)
  }
}
