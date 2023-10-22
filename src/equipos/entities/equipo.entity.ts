import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

///Definimos nuestra clase como una @Entity() y se importa de "typeorm"
@Entity()

///Cada @ que definamos dentro de nuestra clase sera una nueva columna
///de nuestra tabla Equipo
export class Equipo {

    ///ID autoincrimental
    @PrimaryGeneratedColumn("uuid")
    id: String;

    @Column("text", {
        unique: true,
    })
    Unidad: String;

    @Column ("text", {
        array: true,
    })
    Turno: String[];



}

///Postgres no aceota el tipo NUMBER, sino en este caso es NUMERIC
///Algunas otras opciones son
///@IsPositive() para obligar que se un numero positivo
///@IsOptional() para definir como opcional la data, no olvidar el "?" en el nombre
///@IsInt() para estableces que sera un nuemero entero
