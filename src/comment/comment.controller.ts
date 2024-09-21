import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IComment } from '@src/interfaces/IComment';
import { AuthGuard } from '@src/auth/auth.guard';
import { IUser } from '@src/interfaces/IUser';
import { User } from '@src/decorators/user.decorator';
import { CommentDto } from './dto/comment.dto';
//Swagger
@ApiTags('Commnet')
@ApiSecurity('Authorization Token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({
  description: 'Forbidden if token expired or User doesnt owt the Column',
})
//Nest
@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiParam({
    name: 'cardId',
    required: true,
    description: 'Id of Card',
    type: 'number',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns created Comment',
    type: CommentDto,
  })
  @Post(':cardId')
  @HttpCode(201)
  create(
    @User() owner: IUser,
    @Body() createCommentDto: CreateCommentDto,
    @Param('cardId') cardId: number,
  ) {
    return this.commentService.create(createCommentDto, cardId, owner);
  }

  @ApiOperation({ summary: 'Get all comments for a card' })
  @ApiParam({ name: 'cardId', required: true, description: 'Card Id' })
  @ApiResponse({
    status: 200,
    type: [CommentDto],
    description: 'Returns all comments for a card',
  })
  @Get(':cardId')
  findAll(@Param('cardId') cardId: string) {
    return this.commentService.findAll(parseInt(cardId));
  }

  @ApiOperation({ summary: 'Update a comment' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Comment Id',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    type: CommentDto,
    description: 'Returns updated Comment',
  })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCommentDto: CreateCommentDto,
    @User() owner: IUser,
  ) {
    return this.commentService.update(id, updateCommentDto, owner);
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Comment Id',
  })
  @ApiResponse({
    status: 204,
    description: 'Comment deleted',
    type: CommentDto,
  })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number, @User() owner: IUser) {
    return this.commentService.remove(id, owner);
  }
}
