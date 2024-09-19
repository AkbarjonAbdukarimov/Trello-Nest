import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'Column title' })
  @IsDefined()
  @IsString()
  title: string;
}
