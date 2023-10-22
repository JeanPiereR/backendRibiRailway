import { IsArray, IsOptional, IsString, MinLength } from "class-validator";


export class CreateArcDto {

    @IsString()
    @IsOptional()
    Fecha?:String;

    @IsString()
    @MinLength(1)
    Lugar: string;

    @IsString()
    Unidad:String;

    @IsString()
    Observaciones:String;

    ///Creada esta referencia a otra tabla se debe modificar el UPDATE en SERVICE.TS
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    imagenes?: string[]

    @IsString()
    Firma:String;


}
