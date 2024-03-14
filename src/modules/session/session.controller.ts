import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SessionService } from './session.service';
import { StartSessionDto } from './dto/start-session.dto';
import { UserRole } from '../../decorators/roles.decorator';
import { SessionResponseDto } from './dto/session-response.dto';
import { Constants } from '../../decorators/constants';

@ApiTags('login')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/admin')
  @ApiOperation({
    summary: "Start admin's session.",
    description: "Return admin's token after validating email and password",
  })
  @ApiOkResponse({
    type: SessionResponseDto,
    description: 'Admin is logged in.',
  })
  @ApiNotFoundResponse({
    description: "Admin's invalid email or password",
    schema: {
      example: { message: Constants.TOTALINVALID_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Admin's invalid email or password",
    schema: {
      example: { message: Constants.TOTALINVALID_RESPONSE },
    },
  })
  async loginAdmin(@Body() admin: StartSessionDto) {
    return this.sessionService.login({ ...admin, userType: UserRole.Admin });
  }

  @Post('/advisor')
  @ApiOperation({
    summary: "Start advisor's session.",
    description: "Return advisor's token after validating email and password",
  })
  @ApiOkResponse({
    type: SessionResponseDto,
    description: 'Advisor is logged in.',
  })
  @ApiNotFoundResponse({
    description: "Advisor's invalid email or password",
    schema: {
      example: { message: Constants.TOTALINVALID_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Advisor's invalid email or password",
    schema: {
      example: { message: Constants.TOTALINVALID_RESPONSE },
    },
  })
  async loginAdvisor(@Body() advisor: StartSessionDto) {
    return this.sessionService.login({
      ...advisor,
      userType: UserRole.Advisor,
    });
  }

  @Post('/investor')
  @ApiOperation({
    summary: "Start investor's session.",
    description: "Return investor's token after validating email and password",
  })
  @ApiOkResponse({
    type: SessionResponseDto,
    description: 'Investor is logged in.',
  })
  @ApiNotFoundResponse({
    description: "Investor's invalid email or password",
    schema: {
      example: { message: Constants.TOTALINVALID_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Investor's invalid email or password",
    schema: {
      example: { message: Constants.TOTALINVALID_RESPONSE },
    },
  })
  async loginInvestor(@Body() investor: StartSessionDto) {
    return this.sessionService.login({
      ...investor,
      userType: UserRole.Investor,
    });
  }
}
