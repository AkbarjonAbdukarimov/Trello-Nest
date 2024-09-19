import { Card } from '@src/card/entities/card.entity';
import { User } from '@src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Column as ColumnDecorator,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @ColumnDecorator()
  title: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User)
  owner: User;

  @OneToMany(() => Card, (card) => card.column, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cards: Card[];
}
