import { User } from 'src/user/entities/user.entity';
import { IUser } from './IUser';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
