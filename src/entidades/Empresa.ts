import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}