import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipo } from './entities/equipo.entity';


@Injectable()
export class EquiposService {

  //TODO DEPENDENCIAS VARIAS
  ///Propierdad para el manejo de errores
  private readonly logger = new Logger("EquipoService");

  ///Creado para poder inyectar y manejar nuestra data
  constructor(

    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,

  ) {}

  //TODO CREAR
  ///Lo dejamos como async
  async create(createEquipoDto: CreateEquipoDto) {
    
    try {
      ///Crea el registro
      const equipo = this.equipoRepository.create(createEquipoDto);
      ///Guarda el registro
      await this.equipoRepository.save(equipo);

      return equipo;

    } catch (error) {

        this.handleDBExceptions(error);
      
    }

  }


  //TODO TRAER TODOS LOS EQUIPOS, SE PUEDE PAGINAR
  ///Ademas agremas la funcion pagination que se agrega primero en los controllers
  findAll( paginationDto:PaginationDto ) {
    const { limit=10, offset=0 } = paginationDto; ///Si no se define los limites, estos seran por defecto

    return this.equipoRepository.find({
      take: limit,
      skip: offset,
      //TODO Faltan las realaciones
    })

  }


  //TODO TRAER SOLO UN JSON SEGUN EL ID, SE DEBE MODIFICAR EL GET DE EQUIPOS.CONTROLLER.TS
  async findOne( id: string ) {
    const equipo = await this.equipoRepository.findOneBy({  });

    if (!equipo)
      throw new NotFoundException(`Equipo con el ID ${id} no encontrado`);

      return equipo;
  }


  //TODO ACTUALIZACION
  async update(id: string, updateEquipoDto: UpdateEquipoDto) {

    const equipo = await this.equipoRepository.preload({
      id: id,
      ...updateEquipoDto
    });

    if (!equipo) throw new NotFoundException (`Equipo con el id ${id} no encontrado`);

    try {
      await this.equipoRepository.save( equipo );
      return equipo;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }


  //TODO ELIMINAR
  async remove(id: string ) {
    const equipo = await this.findOne(id);

    await this.equipoRepository.remove(equipo);
  }


    ///Metodo para el manejo de errores
    private handleDBExceptions (error: any) {
      if(error.code === "23505")
        throw new BadRequestException (error.detail);

      this.logger.error(error)

      throw new InternalServerErrorException ("Error inesperado, contactar equipo RIBI");
    }

}
