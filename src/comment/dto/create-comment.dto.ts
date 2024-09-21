import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class CreateCommentDto {
  @IsDefined({ message: 'Comment is required' })
  @ApiProperty({ description: 'Text of the comment', example: 'Comment' })
  comment: string;
}
