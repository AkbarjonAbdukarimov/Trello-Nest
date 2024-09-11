import { Exclude, Expose } from 'class-transformer';
import { IUser } from 'src/interfaces/IUser';

export class UserDto implements IUser {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Exclude()
  password: string;
}
