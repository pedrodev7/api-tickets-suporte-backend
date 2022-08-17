import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./Empresa";

@Entity('Locais')
export class Local{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    endereco: string

    @ManyToOne(() => Empresa, empresa => empresa.local)
    @JoinColumn({name: 'empresa_id'})
    empresa: Empresa
}