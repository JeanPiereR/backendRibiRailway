import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArcImagenes } from "./arc-image.entity";

@Entity()

export class Arc {

    ///ID
    @PrimaryGeneratedColumn("uuid")
    id: string;

    ///Todas mis demas columnas
    @Column({
        type: Date
    })
    Fecha?: String;

    @Column("text")
    Lugar: String;

    @Column()
    Unidad: String;

    @Column("text")
    Observaciones: String;

    ///Esta es una relacion de uno es a muchos
    @OneToMany(
        ()=> ArcImagenes,
        (arcImagenes) => arcImagenes.arc,
        {
            cascade: true, ///Elimina todas las referencias
            eager: true, ///Sirve para complementar el find al buscar por ID
        }
    )
    Imagenes?: ArcImagenes[];

    @Column()
    Firma: String;

    ///Relacion de ARC con el usuario que lo esta creando
    @ManyToOne(
        () => User,
        ( user ) => user.arc,
        { eager: true}, ///Nos trae el usuario relacionado
    )
    user: User;
    



}
