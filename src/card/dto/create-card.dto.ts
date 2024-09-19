import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: "Card's title",
    example: 'Card Title',
    required: true,
  })
  @IsDefined({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;
}
