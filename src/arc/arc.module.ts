import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ArcController } from './arc.controller';
import { ArcService } from './arc.service';
import { ArcImagenes } from './entities/arc-image.entity';
import { Arc } from './entities/arc.entity';

@Module({
  controllers: [ArcController],
  providers: [ArcService],

  imports: [
    TypeOrmModule.forFeature([Arc, ArcImagenes]),
    AuthModule, ///Se debe importar para usar el sistema de autentificacion
  ]
})
export class ArcModule {}
