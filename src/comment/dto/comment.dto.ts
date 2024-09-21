import { ApiProperty } from '@nestjs/swagger';
import { IComment } from '@src/interfaces/IComment';
import { UserDto } from '@src/user/dto/user.dto';

export class CommentDto implements IComment {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Comment id',
  })
  id: number;
  @ApiProperty({
    example: 'This is a comment',
    type: 'string',
  })
  comment: string;
  @ApiProperty()
  owner: UserDto;
}
