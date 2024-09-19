import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from './entities/column.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateColumnDto } from './dtos/create-column.dto';
import { IUser } from '@src/interfaces/IUser';

@Injectable()
export class ColumnService {
  constructor(@InjectRepository(Column) private repo: Repository<Column>) {}
  private async validateOwnership(id: number, owner: IUser): Promise<Column> {
    const column = await this.repo
      .createQueryBuilder('col')
      .andWhere('col.id = :id', { id })
      .leftJoinAndSelect('col.owner', 'owner')
      .select(['col', 'owner.id'])
      .getOne();

    if (!column) {
      throw new NotFoundException('Column not found');
    }
    if (column.owner.id !== owner.id) {
      throw new ForbiddenException('You are not the owner of this column');
    }
    return column;
  }
  async create(createColumnDto: CreateColumnDto, owner: IUser) {
    const column = this.repo.create({ ...createColumnDto, owner });
    return await this.repo.save(column);
  }
  findAll() {
    return this.repo.find();
  }
  findForUser(ownerId: number) {
    return this.repo.find({ where: { owner: { id: ownerId } } });
  }
  async findOne(id: number) {
    const column = await this.repo.findOne({ where: { id } });
    if (!column) throw new NotFoundException('Column not found');
    return column;
  }
  async update(id: number, updateColumnDto: CreateColumnDto, owner: IUser) {
    const column = await this.validateOwnership(id, owner);

    return await this.repo.save({ ...column, ...updateColumnDto });
  }
  async remove(id: number, owner: IUser) {
    const column = await this.validateOwnership(id, owner);

    return this.repo.remove(column);
  }
}
