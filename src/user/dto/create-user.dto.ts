import { Req } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IUser } from 'src/interfaces/IUser';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword()
  password: string;
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
