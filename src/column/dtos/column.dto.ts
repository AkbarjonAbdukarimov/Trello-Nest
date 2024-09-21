import { ApiProperty } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';
import { UserDto } from '@src/user/dto/user.dto';

export class ColumnDto extends CreateColumnDto {
  @ApiProperty({
    description: 'Column Id',
    type: 'number',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Owner of the column',
    type: UserDto,
  })
  owner: UserDto;
}
