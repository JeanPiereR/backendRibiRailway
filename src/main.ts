import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger ("Bootstrap");

  ///Configurando nuestra ruta para que agregue el API /API/
  app.setGlobalPrefix("api")

  ///Permisos de libreria externa instalada
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      })
    );

  ///Puerto al que esta escuchando
  await app.listen(process.env.PORT);
  logger.log(`La APP esta corriendo en el puerto ${ process.env.PORT }`)

}
bootstrap();
