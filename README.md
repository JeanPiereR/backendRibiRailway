<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Levanar Backen en Docker, terminal
1.- docker-compose up -d

# Iniciar el modo desarrollo, terminal
1.- yarn start:dev
2.- Si descargaste el repositorio en otro PC inciar :   npm i --save-dev @types/node
    para instalar todas las dependencias

# Librerias a instalar
1.1.- yarn add class-validator class-transformer
1.2.- Se debe instalar codigo adaptador del punto 1.1
            app.useGlobalPipes(
               new ValidationPipe({
              whitelist: true,
              forbidNonWhitelisted: true,
               })
            );

1.3.- yarn add uuid
1.4.- yarn add -D @types/uuid

# Crear nuevas tablas con CLI, terminal
1.- nest g res "nombre" --no-spec
2.- REST API
3.- ENTER X 2

# Crear columnas y dejarlas en modo produccion
1.- Cuando se crea una nueva tabla en SRC se crea una nueva carpeta con el nombre definido
2.- En la carpeta de Entities se creara un archivo NOMBRE.ENTITY.TS donde podremos crear las columnas
3.- En NOMBRE.MODULE.TS se debe importar nuestra tabla que se definio al crear la tabla
4.- Para entrar en modo produccion debemos debemos citar el punto 2 en nombre.module.ts

# Integrar la tabla y derivados
En NOMBRE.MODULE.TS se debe agregar el siguiente codigo para poder importar la o
las tablas creadas en el SRC, asi sean visibles.

  imports: [
    TypeOrmModule.forFeature([TABLA 1, TABLA 1.1])
  ]


# Como trabajar las BD
1.- Al crear una nueva tabla, se definen las columnas en NOMBRE.ENTITY.TS
2.- Se debe trabajar el CREATE-NOMBRE.TS para definir como se recibira la data que se vera en TABLEPLUS y se realizaran las pruebas con POSTMAN
3.- Los datos autogenerados como el ID no es necesario configurarlo en CREATE-NOMBRE.TS,
    ya que se configura los datos que se esperan recibir por parte del usuario

# Configurar CRUD
1.- Esto se realizan en NOMBRE.SERVICE.TS

# Clases comunes, como paginar
Algunas clases o funciones comunes que no estan asociadas a una sola tabla se realizan en la carpeta COMMON

# Carga de archivos
1.- Para la carga de archivo se debe instalar: npm i -D @types/multer
2.- La funcionalidad no estara asociada a ninguna tabla, por lo cual quedara fuera del SRC
3.- Creamos la carpeta files y la definimos como REST API: nest g res files --no-spec, en esta carpeta no
    se utilizara ni los DTO ni las Entities, solo se dejaran y se modificamos tanto el CONTROLLER como el
    SERVICE para dejarlo limpios

# Paquete inscritacion contraseñas
Instalamos yarn add bcrypt + yarn add -D @types/bcrypt
en Servides importamos: import * as bcrypt from 'bcrypt';

# Paquete para JWT
yarn add @nestjs/passport passport
yarn add @nestjs/jwt passport-jwt
yarn add -D @types/passport-jwt
luego configurar el auth.module en la linea JwtModule.registerAsync

# Sistema de autentificacion
1.- Para poder usar el sistema de autentificacion, se debe importar el authModule en todos los
    NOMBRE.MODULE.TS de las carpetas a usar
2.- Para proteger toda una ruta es que se debe hacer un llamado del @Auth() en cada NOMBRE.CONTROLLER.TS
    esto debajo el @Controller("Nombre") y en esta misma carpeta podemos hacer que cada accion tenga la
    proteccion por roles, haciendo el llamado justo debajo del @Post()/Get()/Path()/Delete()/ETC


    