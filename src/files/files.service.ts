import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

    getStaticArcImage( imageName: string ) {

        const path = join( __dirname, '../../static/arc', imageName ); ///  ./../files/helpers/archivos

        if ( !existsSync(path) )
            throw new BadRequestException(`No se pudo encontrar la imagen con el nombre ${ imageName }`);

        return path;
    }


}
