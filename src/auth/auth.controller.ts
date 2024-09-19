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
import {
  ApiBody,
  ApiOAuth2,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
class Token {
  token: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Create a new user and returns token' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Creates User with given credentilas and return access token',
  })
  @Post('singup')
  @HttpCode(201)
  async singUp(@Body() user: CreateUserDto) {
    return this.authService.singUp(user);
  }
  @ApiOperation({ summary: 'Authenticate user and return token' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Authenticate user and return token',
  })
  @Post('singin')
  async singIn(@Body() user: SignInUserDto) {
    return this.authService.singIn(user);
  }
}
