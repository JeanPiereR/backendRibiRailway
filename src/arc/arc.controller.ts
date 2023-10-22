import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ArcService } from './arc.service';
import { CreateArcDto } from './dto/create-arc.dto';
import { UpdateArcDto } from './dto/update-arc.dto';

@Controller('arc')
@Auth()
export class ArcController {
  constructor(private readonly arcService: ArcService) {}

  @Post()
  @Auth()
  create(
    @Body() createArcDto: CreateArcDto,
    @GetUser() user: User, ///Para saber quien creo el arc
  ) {
    return this.arcService.create(
      createArcDto,
      user, ///Para saber quien creo, pero debemos hacer una modificacion en CREATE
      );
  }

  
  @Get()
  @Auth()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.arcService.findAll( paginationDto );
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.arcService.findOnePlain(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArcDto: UpdateArcDto,
    @GetUser() user: User,
    ) {
    return this.arcService.update(id, updateArcDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.arcService.remove(id);
  }
}
