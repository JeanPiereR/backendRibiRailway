import { IsArray, IsString, MinLength } from "class-validator";

///El como esperamos que se reciba la data
export class CreateEquipoDto {

    @IsString()
    @MinLength(1)
    Unidad: string;

    @IsString({ each: true}) ///Todos los elementos del arreglo deben ser String
    @IsArray()
    Turno: string[]

}
