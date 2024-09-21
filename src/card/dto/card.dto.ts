import { ApiProperty } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';
import { Column } from '@src/column/entities/column.entity';
import { ColumnDto } from '@src/column/dtos/column.dto';

export class CardDto extends CreateCardDto {
  @ApiProperty({
    description: 'Card Id',
    type: 'number',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Referenced Column Id',
    type: 'number',
    example: 1,
  })
  columnId: number;
  @ApiProperty({
    description: 'Column',
    type: ColumnDto,
  })
  column: ColumnDto;
}
