import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposModule } from './equipos/equipos.module';
import { CommonModule } from './common/common.module';
import { ArcModule } from './arc/arc.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    ///Conexion de variables de entorno mediante el .env
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, ///desactivar en produccion
    }),

    EquiposModule,

    CommonModule,

    ArcModule,

    FilesModule,

    AuthModule,
  ],
})
export class AppModule {}
