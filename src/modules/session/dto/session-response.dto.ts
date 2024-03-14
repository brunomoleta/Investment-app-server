import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../../decorators/constants';

export class SessionResponseDto {
  @ApiProperty({
    description: 'Api response after the successful login',
    example: Constants.TOKEN_RESPONSE,
  })
  token: string;
}
