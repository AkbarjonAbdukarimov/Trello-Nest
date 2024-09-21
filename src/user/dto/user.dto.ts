import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IUser } from 'src/interfaces/IUser';

export class UserDto implements IUser {
  @ApiProperty({ example: 1, type: 'number', description: 'User id' })
  @Expose()
  id: number;
  @ApiProperty({
    example: 'jondoe@mail.com',
    type: 'string',
    description: 'User email',
  })
  @Expose()
  email: string;
  @ApiProperty({ example: 'Jon Doe', type: 'string', description: 'User name' })
  @Expose()
  name: string;
  @Exclude()
  password: string;
}
