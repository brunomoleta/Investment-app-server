import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  product_name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(16)
  @MaxLength(200)
  description!: string;

  @ApiProperty()
  @IsNumber()
  @MinLength(0)
  profit!: number;
}
