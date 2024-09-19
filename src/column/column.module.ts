import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Column } from './entities/column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ColumnController],
  imports: [TypeOrmModule.forFeature([Column]), JwtModule],
  providers: [ColumnService],
})
export class ColumnModule {}
