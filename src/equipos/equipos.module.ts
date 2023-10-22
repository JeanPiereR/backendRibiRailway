import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposController } from './equipos.controller';
import { EquiposService } from './equipos.service';

import { AuthModule } from 'src/auth/auth.module';
import { Equipo } from './entities/equipo.entity';

@Module({
  controllers: [EquiposController],
  providers: [EquiposService],

  ///Importamos nuestra tabla entidad, Equipos
  imports: [
    TypeOrmModule.forFeature([Equipo]),
    AuthModule,
  ]
})
export class EquiposModule {}
