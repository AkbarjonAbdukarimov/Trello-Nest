import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword()
  password: string;
}
