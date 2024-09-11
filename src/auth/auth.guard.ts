import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const user = await this.jwtService.verifyAsync<UserDto>(token);

      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
