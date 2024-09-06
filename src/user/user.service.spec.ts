import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { User } from './entities/user.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from 'src/interfaces/IUser';
import exp from 'constants';
import { BadRequestException } from '@nestjs/common';
const db: IUser[] = [
  {
    id: 2,
    email: 'test2@test.com',
    password: 'password',
    name: 'test2',
  },
];
const mockRepository: DeepPartial<Repository<User>> = {
  create: (user: DeepPartial<User>) =>
    plainToInstance(User, { ...instanceToPlain(user), id: 1 }),
  save: async (user: User) => Promise.resolve(user),
  findOneBy: (options: FindOptionsWhere<User>) =>
    db.find((user) => user.email === options.email),
};

describe('UserService', () => {
  let service: UserService;
  let userRepo: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepo = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create(
      plainToInstance(CreateUserDto, {
        email: 'test@test.com',
        password: 'password',
        name: 'test',
      }),
    );

    expect(user).toBeDefined();
  });
  it('should hash  user password', async () => {
    const user = await service.create(
      plainToInstance(CreateUserDto, {
        email: 'test@test.com',
        password: 'password',
        name: 'test',
      }),
    );
    const [hash, salt] = user.password.split('.');
    db.push(user);
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
  });
  it('shpould throw error if user already exists', async () => {
    expect(
      service.create(
        plainToInstance(CreateUserDto, {
          email: 'test@test.com',
          password: 'password',
          name: 'test',
        }),
      ),
    ).rejects.toThrow(BadRequestException);
  });
  it('should verify user', async () => {
    const user = await service.verify(
      plainToInstance(User, {
        email: 'test@test.com',
        password: 'password',
        name: 'test',
      }),
    );
    expect(user).toBeDefined();
  });
  it('should reject user verification', async () => {
    expect(
      service.verify(
        plainToInstance(User, {
          email: 'test@test.com',
          password: 'password1',
          name: 'test',
        }),
      ),
    ).rejects.toThrow(BadRequestException);
  });
});
