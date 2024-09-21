import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CardService } from '@src/card/card.service';
import { CardModule } from '@src/card/card.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [TypeOrmModule.forFeature([Comment]), CardModule],
})
export class CommentModule {}
