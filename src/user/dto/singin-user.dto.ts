import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: 'jondoe@mail.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password_1234' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword()
  password: string;
}
