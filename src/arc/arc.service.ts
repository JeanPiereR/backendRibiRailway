import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateArcDto } from './dto/create-arc.dto';
import { UpdateArcDto } from './dto/update-arc.dto';
import { ArcImagenes } from './entities/arc-image.entity';
import { Arc } from './entities/arc.entity';

@Injectable()
export class ArcService {
  //Dependencias varias
  private readonly logger = new Logger("ArcService");

  ///Constructor de la data
  constructor(

    @InjectRepository(Arc)
    private readonly arcRepository: Repository<Arc>,

    @InjectRepository(ArcImagenes)
    private readonly arcImagenesRepository: Repository<ArcImagenes>,

    ///Solo cuando hay relaciones
    private readonly dataSource: DataSource,
  ) {}





  //TODO CREAR
  async create(
    createArcDto: CreateArcDto,
    user: User, ///nos permite saber quien creo
    ) {
    try {
      const { imagenes = [], ...arcDetails } = createArcDto ///Modificada para agregar relacion

      ///Crea el registro, fue modificda para agregar la relacion
      const arc = this.arcRepository.create({
        ...createArcDto,
        Imagenes: imagenes.map( imagenes => this.arcImagenesRepository.create({ url: imagenes })),
        user, ///Saber quien lo creo
      });
      ///Guarda el registro
      await this.arcRepository.save(arc);

      return {...arc, imagenes};

    } catch (error) {

        this.handleDBExceptions(error);
      
    }
  }



  //TODO TRAER TODO
  ///Se modifico para traer la relacion..

  async findAll( paginationDto:PaginationDto ) {
    
    const { limit=10, offset=0 } = paginationDto;

    const arc = await this.arcRepository.find({
      take: limit,
      skip: offset,
      //aqui agregamos nuestra columna de relacion
      relations: {
        Imagenes: true, //Trae las imagenes
      }
    })
    
    ///El mapeo lo ralizamos para cambiar la vista de la data de tal manera
    ///que al traer todo, de la img solo el url, ignorando el ID, etc
    return arc.map( arc => ({
      ...arc,
      Imagenes: arc.Imagenes.map ( img=> img.url )
    }))
  }




  //TODO TRAER UNO
  ///No tengo ni la menor idea de lo que es, solo copie codigo T.T
  async findOne( id: string ) {

    let arc: Arc;

    if ( isUUID(id) ) {
      arc = await this.arcRepository.findOneBy({ id: id });
    } else {
      const queryBuilder = this.arcRepository.createQueryBuilder();
      arc = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: id.toUpperCase(),
          slug: id.toLowerCase(),
        }).getOne();
    }

    if ( !arc )
    throw new NotFoundException(`Product with ${ id } not found`);

    return arc;
}

  async findOnePlain( id: string ) {
    const { Imagenes = [], ...rest } = await this.findOne( id );
    return {
      ...rest,
      images: Imagenes.map( image => image.url )
    }
}




  

  //TODO ACTUALIZAR
  ///Se hace en cascada por que hay un conexion con imagenes
  async update(
    id: string,
    updateArcDto: UpdateArcDto,
    user: User,
    ) {

    const { imagenes, ...toUpdate } =updateArcDto

    const arc = await this.arcRepository.preload({
      id, ...toUpdate
    });

    if (!arc) throw new NotFoundException (`El Arc con el id ${id} no encontrado`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if ( imagenes ) {
        await queryRunner.manager.delete( ArcImagenes, { arc: { id } } );

        arc.Imagenes = imagenes.map(
          imagenes => this.arcImagenesRepository.create({  url: imagenes })
          )
      }

      arc.user = user;
      await queryRunner.manager.save( arc );

      ///await this.arcRepository.save( arc );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );

    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBExceptions(error);
    }
  }




  //TODO ELIMINAR
  async remove(id: string) {
    const arc = await this.findOne(id);

    await this.arcRepository.remove(arc);
    
  }





      ///Metodo para el manejo de errores
      private handleDBExceptions (error: any) {
        if(error.code === "23505")
          throw new BadRequestException (error.detail);
  
        this.logger.error(error)
  
        throw new InternalServerErrorException ("Error inesperado, contactar equipo RIBI");
      }
  
}
