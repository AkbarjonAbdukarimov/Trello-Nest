import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { ColumnService } from '@src/column/column.service';
import { parse } from 'path';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private repo: Repository<Card>,
    private ColumnSercvice: ColumnService,
  ) {}

  async create(createCardDto: CreateCardDto, columnId: string) {
    const column = await this.ColumnSercvice.findOne(parseInt(columnId));
    const card = this.repo.create({ ...createCardDto, column });
    return await this.repo.save(card);
  }
  async findOneById(id: number) {
    const card = await this.repo.findOne({ where: { id } });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }
  async findForColumn(columnId: number) {
    const column = await this.ColumnSercvice.findOne(columnId);
    return this.repo.find({ where: { column: { id: columnId } } });
  }

  async update(id: number, updateCardDto: CreateCardDto) {
    const card = await this.findOneById(id);
    return this.repo.save({ ...card, ...updateCardDto });
  }

  async remove(id: number) {
    const card = await this.findOneById(id);
    return await this.repo.remove(card);
  }
}
