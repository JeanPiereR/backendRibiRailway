import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Arc } from "./arc.entity";

@Entity()
export class ArcImagenes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    url:string;

    ///Es la relacion con nuestro ARC, de muchos a uno
    @ManyToOne(
        ()=>Arc,
        (arc) => arc.Imagenes,
        { onDelete: "CASCADE" }
    )
    arc: Arc

}
