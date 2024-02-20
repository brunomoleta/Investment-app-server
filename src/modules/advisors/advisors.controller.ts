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
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { Advisor } from './entities/advisor.entity';
import { RetrieveAdvisorDto } from './dto/retrieve-advisor.dto';

@Controller('advisor')
@ApiTags('advisor')
export class AdvisorsController {
  constructor(private readonly advisorsService: AdvisorsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Advisor created successfully',
    isArray: false,
    type: Advisor,
  })
  @ApiConflictResponse({
    description: 'Conflict. This email already exists',
  })
  @ApiBadRequestResponse({
    description: "Bad request. There's missing data",
  })
  create(@Body() createAdvisorDto: CreateAdvisorDto) {
    return this.advisorsService.create(createAdvisorDto);
  }

  @Get('all')
  @ApiOkResponse({
    isArray: true,
    type: RetrieveAdvisorDto,
    description: 'Admins get advisors with all the info.',
  })
  @ApiUnauthorizedResponse({
    description: 'Only admins can access this route',
  })
  @UseGuards(JwtGuard)
  findAllAdminOnly(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllAdminOnly(request);
  }

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: Advisor,
    description: 'Get advisors without authentication',
  })
  findAllNoAuth(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllNoAuth(request);
  }

  @Get('speciality_id/:speciality_id')
  @ApiOkResponse({
    isArray: true,
    type: Advisor,
    description:
      'Get advisors filtered by their speciality, without authentication',
  })
  @ApiNotFoundResponse({
    description: 'Please set a valid speciality_id',
  })
  filterPerSpecialityId(
    @Req() request: Request,
    @Param('speciality_id') speciality_id: string,
  ) {
    return this.advisorsService.filterPerSpecialityId(request, speciality_id);
  }

  @Get('experience/:experience')
  @ApiOkResponse({
    isArray: true,
    type: Advisor,
    description:
      'Get advisors filtered by their experience level, without authentication',
  })
  @ApiNotFoundResponse({
    description:
      'Please set a valid experience. Either beginner, intermediate, advanced, expert',
  })
  filterPerExperience(
    @Req() request: Request,
    @Param('experience') experience: Experience,
  ) {
    return this.advisorsService.filterPerExperience(request, experience);
  }

  @Get('id')
  @ApiOkResponse({
    type: RetrieveAdvisorDto,
    isArray: false,
    description: 'Retrieve an advisor through the token',
  })
  @ApiUnauthorizedResponse({
    description: "It's necessary to set a valid token to retrieve the advisor",
  })
  @UseGuards(JwtGuard)
  findById(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.findById(decoded.sub);
  }

  @Patch('password')
  @ApiOkResponse({
    description: "Update investor's password after validating his current one.",
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
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
  @ApiNoContentResponse({
    description: 'Deleted an investor through the token successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
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
