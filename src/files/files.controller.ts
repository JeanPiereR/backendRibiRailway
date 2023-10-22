import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter';
import { fileNamer } from './helpers/fileName';

@Controller('files')
export class FilesController {

    constructor(
        private readonly filesService: FilesService,
        private readonly configService: ConfigService,
    ) {}


    @Get('arc/:imageName')
    findArcImagen(
        @Res() res: Response,
        @Param('imageName') imageName: string
    ) {

        const path = this.filesService.getStaticArcImage( imageName );

        res.sendFile( path );

    }

    


    @Post ("arc")
    @UseInterceptors ( FileInterceptor( "file", {
        fileFilter: fileFilter,
        storage: diskStorage ({
            destination:"./static/arc",
            filename: fileNamer
        }) //donde alojar los archivos
    } ) )
    uploadArcImagenes(
        @UploadedFile() file: Express.Multer.File
        ) {

        if ( !file ) {
            throw new BadRequestException ("El tipo de archivo no esta permitido")
        }
        
        
        const secureUrl = `${this.configService.get('HOST_API') }/files/arc/${ file.filename }`;

        return { secureUrl };
    }

}
