import { Arc } from "src/arc/entities/arc.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column( "text", {
        unique: true,
    })
    email: string;

    @Column( "text", {
        select: false,
    })
    password: string;

    @Column( "text")
    fullName: string;

    @Column( "bool", {
        default: true,
    })
    isActive: boolean;

    @Column( "text", {
        array: true,
        default: ["user"]
    })
    roles: string[];

    @OneToMany(
        () => Arc,
        ( arc ) => arc.user,
    )
    arc: Arc;




    @BeforeInsert()
    checkFieldsBeforesInsert() {
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforesUpdate(){
        this.checkFieldsBeforesInsert();
    }


}
