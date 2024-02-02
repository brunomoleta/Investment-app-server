import { Controller, Get, Post, Body, Param, Delete, HttpCode, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { StartSessionDto } from './dto/start-session.dto';
import { AdvisorsService } from '../advisors/advisors.service';
import { InvestorsService } from '../investors/investors.service';

@ApiTags('login')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {
  }

  @Post('/admin')
  async loginAdmin(@Body() admin: StartSessionDto) {
    return this.sessionService.login({ ...admin, userType: 'admin' });
  }

  @Post('/advisor')
  async loginAdvisor(@Body() advisor: StartSessionDto) {
    return this.sessionService.login({ ...advisor, userType: 'advisor' });
  }

  @Post('/investor')
  async loginInvestor(@Body() investor: StartSessionDto) {
    return this.sessionService.login({ ...investor, userType: 'investor' });
  }

}