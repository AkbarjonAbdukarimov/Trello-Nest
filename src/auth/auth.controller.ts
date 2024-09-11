import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUserDto } from 'src/user/dto/singin-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('singup')
  @HttpCode(201)
  async singUp(@Body() user: CreateUserDto) {
    return this.authService.singUp(user);
  }
  @Post('singin')
  async singIn(@Body() user: SignInUserDto) {
    return this.authService.singIn(user);
  }
  @UseGuards(AuthGuard)
  @Get('protected')
  protected() {
    return 'Protected route';
  }
}
