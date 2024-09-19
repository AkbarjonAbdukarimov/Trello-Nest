import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { ColumnService } from '@src/column/column.service';
import { ColumnModule } from '@src/column/column.module';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [TypeOrmModule.forFeature([Card]), ColumnModule],
})
export class CardModule {}
