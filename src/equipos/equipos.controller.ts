import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { EquiposService } from './equipos.service';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}


  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }


  ///Traemos la funcion de paginar creada en Common
  @Get()
  findAll( @Query() paginationDto:PaginationDto  ) {
    return this.equiposService.findAll( paginationDto );
  }


  ///Se agrega el ParseUUIDPipe, con el fin de que no tenga problema en EQUIPOS.SERVICE.TS
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposService.findOne( id );
  }

  ///Actualizar
  @Patch(':id')
  update(
  @Param('id', ParseUUIDPipe ) id: string,
  @Body() updateEquipoDto: UpdateEquipoDto
  ) {
    return this.equiposService.update( id, updateEquipoDto );
  }


  
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposService.remove( id );
  }

}
