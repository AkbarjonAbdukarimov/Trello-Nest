import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '@src/interfaces/IUser';
import { Request } from 'express';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user;
});
