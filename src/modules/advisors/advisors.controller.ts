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
  ApiResponse,
  ApiTags,
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
  @ApiResponse({
    status: 200,
    description: 'Get advisors with all the info.',
  })
  @UseGuards(JwtGuard)
  findAllAdminOnly(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllAdminOnly(request);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get advisors',
  })
  findAllNoAuth(@Req() request: Request): Promise<RetrieveAdvisors> {
    return this.advisorsService.findAllNoAuth(request);
  }

  @Get('speciality_id/:speciality_id')
  @ApiResponse({
    status: 200,
    description: 'Filter advisors through their speciality.',
  })
  filterPerSpecialityId(
    @Req() request: Request,
    @Param('speciality_id') speciality_id: string,
  ) {
    return this.advisorsService.filterPerSpecialityId(request, speciality_id);
  }

  @Get('experience/:experience')
  @ApiResponse({
    status: 200,
    description: 'Filter advisors through their experience level.',
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
  @ApiResponse({
    status: 200,
    description: 'Update an advisor data through the token',
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
  remove(@Request() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = decode(token);

    return this.advisorsService.remove(decoded.sub);
  }
}
