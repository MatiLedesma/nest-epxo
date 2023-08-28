import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsStrongPassword } from 'class-validator';

export class UserRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
