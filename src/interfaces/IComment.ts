import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './IUser';

export interface IComment {
  id: number;
  comment: string;
  owner: IUser;
}
