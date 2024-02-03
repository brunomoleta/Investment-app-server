import { Controller, Get, Post, Body, Param, Delete, HttpCode, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { StartSessionDto } from './dto/start-session.dto';
import { UserRole } from '../../decorators/roles.decorator';

@ApiTags('login')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {
  }

  @Post('/admin')
  async loginAdmin(@Body() admin: StartSessionDto) {
    return this.sessionService.login({ ...admin, userType: UserRole.Admin });
  }

  @Post('/advisor')
  async loginAdvisor(@Body() advisor: StartSessionDto) {
    return this.sessionService.login({ ...advisor, userType: UserRole.Advisor });
  }

  @Post('/investor')
  async loginInvestor(@Body() investor: StartSessionDto) {
    return this.sessionService.login({ ...investor, userType: UserRole.Investor });
  }

}