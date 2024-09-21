import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateColumnDto } from './dtos/create-column.dto';
import { Column } from './entities/column.entity';
import { AuthGuard } from '@src/auth/auth.guard';
import { User } from '@src/decorators/user.decorator';
import { IUser } from '@src/interfaces/IUser';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';
import { ColumnDto } from './dtos/column.dto';
//Nest
@UseGuards(AuthGuard)
@Controller('columns')
//Swagger
@ApiTags('Column')
@ApiSecurity('Authorization Token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({
  description: 'Forbidden if token expired or User doesnt owt the Column',
})
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}
  @ApiOperation({ summary: "Gets User's Columns " })
  @ApiResponse({
    status: 200,
    description: 'Returns user Column',
    type: [ColumnDto],
  })
  @Get()
  findAll(@User() owner: IUser): Promise<Column[]> {
    return this.columnService.findForUser(owner.id);
  }

  @ApiOperation({ summary: 'Create a new column' })
  @ApiResponse({
    status: 201,
    description: 'Returns created Column',
    type: ColumnDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Post()
  create(
    @Body() createColumnDto: CreateColumnDto,
    @User() owner: IUser,
  ): Promise<Column> {
    return this.columnService.create(createColumnDto, owner);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates Column by Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns updated Column',
    type: ColumnDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  update(
    @User() owner: IUser,
    @Param('id') id: number,
    @Body() column: CreateColumnDto,
  ) {
    return this.columnService.update(id, column, owner);
  }

  @ApiOperation({ summary: 'Deletes Column ' })
  @ApiResponse({
    status: 204,
    description: 'Returns deleted Column',
    type: ColumnDto,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Column not found' })
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string, @User() owner: IUser) {
    return this.columnService.remove(parseInt(id), owner);
  }
}
