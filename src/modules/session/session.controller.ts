import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SessionService } from './session.service';
import { StartSessionDto } from './dto/start-session.dto';
import { UserRole } from '../../decorators/roles.decorator';
import { SessionResponseDto } from './dto/session-response.dto';

@ApiTags('login')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/admin')
  @ApiOkResponse({
    type: SessionResponseDto,
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
  @ApiOkResponse({
    type: SessionResponseDto,
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
    type: SessionResponseDto,
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
