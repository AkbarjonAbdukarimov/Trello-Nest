import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
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
import { AuthGuard } from '@src/auth/auth.guard';
import { Card } from './entities/card.entity';

//Swagger
@ApiTags('Card')
@ApiSecurity('Authorization Token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({
  description: 'Forbidden if token expired or User doesnt owt the Column',
})
//Nest
@Controller('cards')
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':columnId')
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({ status: 201, description: 'Returns created Card' })
  @ApiNotFoundResponse({ description: 'Column not found' })
  @ApiParam({ name: 'columnId', description: 'Column Id ' })
  create(
    @Body() createCardDto: CreateCardDto,
    @Param('columnId') columnId: string,
  ) {
    return this.cardService.create(createCardDto, columnId);
  }
  @ApiOperation({ summary: 'Gets Cards for particukar Column' })
  @ApiResponse({
    status: 200,
    description: 'Retuns Cards for particukar Column',
  })
  @ApiNotFoundResponse({ description: 'Column not found' })
  @ApiParam({ name: 'columnId', description: 'Column Id ' })
  @Get(':columnId')
  findForColumn(@Param('columnId') id: number) {
    return this.cardService.findForColumn(id);
  }

  @ApiOperation({ summary: 'Updates Card' })
  @ApiResponse({
    status: 200,
    description: 'Retuns Updated Card',
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiParam({ name: 'id', description: 'Card Id ' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCardDto: CreateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }
  @ApiOperation({ summary: 'Deletes Card and Comments of it' })
  @ApiResponse({
    status: 204,
    description: 'Retuns Deleted Card',
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiParam({ name: 'id', description: 'Card Id ' })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
