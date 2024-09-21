import { Card } from '@src/card/entities/card.entity';
import { User } from '@src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User)
  owner: User;

  @JoinColumn({ name: 'card_id' })
  @ManyToOne(() => Card)
  card: Card;
}
