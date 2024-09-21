import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/interfaces/IUser';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  singToken(user: IUser) {
    const payload = { username: user.name, id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async singUp(user: CreateUserDto) {
    const newUser = await this.userService.create(user);
    return { token: this.singToken(newUser) };
  }
  async singIn(user: Partial<UserDto>) {
    const validUser = await this.userService.verify({
      email: user.email,
      password: user.password,
    });
    console.log(validUser);
    return { token: this.singToken(validUser) };
  }
}
