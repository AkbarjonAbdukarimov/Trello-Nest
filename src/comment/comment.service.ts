import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { IUser } from '@src/interfaces/IUser';
import { CardService } from '@src/card/card.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    private cardService: CardService,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    cardId: number,
    owner: IUser,
  ) {
    const card = await this.cardService.findOneById(cardId);
    const comment = this.repo.create({
      ...createCommentDto,
      card,
      owner,
    });
    return this.repo.save(comment);
  }

  findAll(cardId: number) {
    return this.repo
      .createQueryBuilder('comment')
      .where('comment.card = :cardId', { cardId })
      .leftJoinAndSelect('comment.owner', 'owner')
      .select(['comment', 'owner.id', 'owner.name', 'owner.email'])
      .getMany();
  }

  async findOne(id: number) {
    const comment = await this.repo
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .leftJoinAndSelect('comment.owner', 'owner')
      .select(['comment', 'owner.id', 'owner.name', 'owner.email'])
      .getOne();
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }
  async validateOwnership(id: number, owner: IUser) {
    const comment = await this.findOne(id);
    if (comment.owner.id != owner.id)
      throw new ForbiddenException(
        "You don't have permission to update this comment",
      );
    return comment;
  }
  async update(id: number, updateCommentDto: CreateCommentDto, owner: IUser) {
    const comment = await this.validateOwnership(id, owner);
    return this.repo.save({ ...comment, ...updateCommentDto });
  }

  async remove(id: number, owner: IUser) {
    const comment = await this.validateOwnership(id, owner);
    return this.repo.remove(comment);
  }
}
