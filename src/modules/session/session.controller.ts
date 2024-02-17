import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SessionService } from './session.service';
import { StartSessionDto } from './dto/start-session.dto';
import { UserRole } from '../../decorators/roles.decorator';

@ApiTags('login')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/admin')
  @ApiResponse({
    status: 200,
    description: 'Admin is logged in.',
  })
  @ApiNotFoundResponse({
    description: "Admin's invalid email or password",
  })
  @ApiUnauthorizedResponse({
    description: "Admin's invalid email or password",
  })
  async loginAdmin(@Body() admin: StartSessionDto) {
    return this.sessionService.login({ ...admin, userType: UserRole.Admin });
  }

  @Post('/advisor')
  @ApiResponse({
    status: 200,
    description: 'Advisor is logged in.',
  })
  @ApiNotFoundResponse({
    description: "Advisor's invalid email or password",
  })
  @ApiUnauthorizedResponse({
    description: "Advisor's invalid email or password",
  })
  async loginAdvisor(@Body() advisor: StartSessionDto) {
    return this.sessionService.login({
      ...advisor,
      userType: UserRole.Advisor,
    });
  }

  @Post('/investor')
  @ApiResponse({
    status: 200,
    description: 'Investor is logged in.',
  })
  @ApiNotFoundResponse({
    description: "Investor's invalid email or password",
  })
  @ApiUnauthorizedResponse({
    description: "Investor's invalid email or password",
  })
  async loginInvestor(@Body() investor: StartSessionDto) {
    return this.sessionService.login({
      ...investor,
      userType: UserRole.Investor,
    });
  }
}
