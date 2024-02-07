import { IsNotEmpty, IsString } from 'class-validator';

export class StartSessionDto {
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
