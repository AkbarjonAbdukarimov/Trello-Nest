import { Column as CColumn } from '@src/column/entities/column.entity';
import { Comment } from '@src/comment/entities/comment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => CColumn, (column) => column.cards)
  @JoinColumn({ name: 'column_id' })
  column: CColumn;

  @OneToMany(() => Comment, (comment) => comment.card, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
