import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Local } from "./Local";

@Entity('empresas')
export class Empresa{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'numeric', scale: 14})
    cnpj: number

    @Column({type: 'text'})
    descricao: string

    @OneToMany(() => Local, local => local.empresa)
    local: Local[]
}