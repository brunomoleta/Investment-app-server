import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  name!: string;

  @ApiProperty()
  @IsString()
  @Length(11, 11)
  phone_number!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}