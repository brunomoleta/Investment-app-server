import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdvisorsService } from './advisors.service';
import { CreateAdvisorDto, Experience } from './dto/create-advisor.dto';
import { JwtGuard } from '../session/jwt.guard';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { decode } from 'jsonwebtoken';
import { RetrieveAdvisors } from './advisors';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { Advisor } from './entities/advisor.entity';
import { RetrieveAdvisorDto } from './dto/retrieve-advisor.dto';
import { Constants } from '../../decorators/constants';

@Controller('advisor')
@ApiTags('advisor')
export class AdvisorsController {
  constructor(private readonly advisorsService: AdvisorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create advisor.',
    description: 'User creates an advisor account.',
  })
  @ApiCreatedResponse({
    description: 'Advisor created successfully',
    isArray: false,
    type: Advisor,
  })
  @ApiBadRequestResponse({
    description: "Bad request. There's missing data",
    schema: {
      example: { message: Constants.EMAIL_RESPONSE },
    },
  })
  @ApiConflictResponse({
    description: Constants.EMAIL_RESPONSE,
    schema: {
      example: { message: Constants.EMAIL_RESPONSE },
    },
  })
  create(@Body() createAdvisorDto: CreateAdvisorDto) {
    return this.advisorsService.create(createAdvisorDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List all advisors.',
    description: 'List all advisors.',
  })
  @ApiOkResponse({
    isArray: true,
    type: RetrieveAdvisorDto,
    description: 'Admins get advisors with all the info.',
  })
  @ApiUnauthorizedResponse({
    description: 'Only admins can access this route',
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAllAdminOnly(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllAdminOnly(request);
  }

  @Get()
  @ApiOperation({
    summary: 'List all advisors with admin only access.',
    description: 'List all advisors with all the info related to an advisor.',
  })
  @ApiOkResponse({
    isArray: true,
    type: Advisor,
    description: 'Get advisors without authentication',
  })
  findAllNoAuth(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllNoAuth(request);
  }

  @Get('speciality_id/:speciality_id')
  @ApiOperation({
    summary: 'Filter advisors through their speciality.',
    description: 'Filter advisors through their speciality.',
  })
  @ApiNotFoundResponse({
    description: 'Please set a valid speciality_id',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiOkResponse({
    isArray: true,
    type: Advisor,
    description:
      'Get advisors filtered by their speciality, without authentication',
  })
  filterPerSpecialityId(
    @Req() request: Request,
    @Param('speciality_id') speciality_id: string,
  ) {
    return this.advisorsService.filterPerSpecialityId(request, speciality_id);
  }

  @Get('experience/:experience')
  @ApiOperation({
    summary: 'Filter advisors through their experience.',
    description: 'Filter advisors through their experience.',
  })
  @ApiNotFoundResponse({
    description:
      'Please set a valid experience. Either beginner, intermediate, advanced, expert',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiOkResponse({
    isArray: true,
    type: Advisor,
    description:
      'Get advisors filtered by their experience level, without authentication',
  })
  filterPerExperience(
    @Req() request: Request,
    @Param('experience') experience: Experience,
  ) {
    return this.advisorsService.filterPerExperience(request, experience);
  }

  @Get('id')
  @ApiOperation({
    summary: 'Retrieve advisor through their token.',
    description: 'Retrieve advisor through their token.',
  })
  @ApiOkResponse({
    type: RetrieveAdvisorDto,
    isArray: false,
    description: 'Retrieve an advisor through the token',
  })
  @ApiUnauthorizedResponse({
    description: "It's necessary to set a valid token to retrieve the advisor",
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.findById(decoded.sub);
  }

  @Patch('password')
  @ApiOperation({
    summary: "Update advisor's password.",
    description:
      "Update advisor's password after validating his current one through the token",
  })
  @ApiOkResponse({
    description: "Update advisor's password after validating his current one.",
  })
  @ApiBadRequestResponse({
    description:
      'New password has to use guidelines specified at update-password.dto',
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to set a valid token to update the advisor's password.",
  })
  @ApiConflictResponse({
    description: 'Conflict. Invalid password.',
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async changePassword(
    @Request() request: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return await this.advisorsService.updatePassword(
      decoded.sub,
      updatePasswordDto,
    );
  }

  @Patch()
  @ApiOperation({
    summary: "Update advisor's info.",
    description: "Update advisor's personal data through the token",
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: Advisor,
    description: 'Update an advisor data through the token',
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to set a valid token to update the advisor's password.",
  })
  update(@Request() request: any, @Body() updateAdvisorDto: UpdateAdvisorDto) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.update(decoded.sub, updateAdvisorDto);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete an advisor.',
    description: 'Delete an advisor through their token',
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Deleted an investor through the token successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      example: { message: Constants.NOTFOUND_RESPONSE },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      "It's necessary to set a valid token to update the advisor's password.",
  })
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.remove(decoded.sub);
  }
}
