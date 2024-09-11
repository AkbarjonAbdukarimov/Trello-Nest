import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
const scrypt = promisify(_scrypt);
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    let user = await this.getByEmail(createUserDto.email);
    if (user) throw new BadRequestException('User already exists');
    user = this.userRepository.create(createUserDto);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
    user.password = `${hash.toString('hex')}.${salt}`;
    return plainToInstance(UserDto, await this.userRepository.save(user));
  }
  private async getByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
  async verify(user: { email: string; password: string }) {
    const foundUser = await this.getByEmail(user.email);
    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }
    const [hash, salt] = foundUser.password.split('.');
    const hashBuffer = (await scrypt(user.password, salt, 32)) as Buffer;
    if (hash === hashBuffer.toString('hex')) {
      return plainToInstance(UserDto, foundUser);
    }
    throw new BadRequestException('Invalid credentials');
  }
}
