import { Req } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IUser } from 'src/interfaces/IUser';
import { SignInUserDto } from './singin-user.dto';

export class CreateUserDto extends SignInUserDto {
  @ApiProperty({ example: 'Jon Doe' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
