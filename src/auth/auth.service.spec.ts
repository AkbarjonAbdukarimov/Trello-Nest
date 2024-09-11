import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';
const mockUserService: Partial<UserService> = {
  create: jest.fn(),
  verify: jest.fn(),
};
const mockJwtService: Partial<JwtService> = {
  sign: jest.fn(),
  verifyAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should sing the token', () => {
    const user = {
      name: 'test',
      id: 1,
      email: 'test@mail.com',
      password: 'password',
    };
    jest.spyOn(mockJwtService, 'sign').mockReturnValue('token');
    const token = service.singToken(user);
    expect(token).toBe('token');
  });
  it('should sing up', async () => {
    const user = plainToInstance(UserDto, {
      name: 'test',
      id: 1,
      email: 'test@mail.com',
      password: 'password',
    });
    jest.spyOn(mockUserService, 'create').mockResolvedValue(user);
    jest.spyOn(mockJwtService, 'sign').mockReturnValue('token');
    const res = await service.singUp(user);
    expect(res).toBeDefined();
    expect(res.token).toBe('token');
  });
  it('should sing in', async () => {
    const user = plainToInstance(UserDto, {
      name: 'test',
      id: 1,
      email: 'test@mail.com',
      password: 'password',
    });
    jest.spyOn(mockUserService, 'create').mockResolvedValue(user);
    jest.spyOn(mockJwtService, 'sign').mockReturnValue('token');
    const res = await service.singUp(user);
    expect(res).toBeDefined();
    expect(res.token).toBe('token');
  });
});
