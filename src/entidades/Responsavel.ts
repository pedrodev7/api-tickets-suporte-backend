import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('responsaveis')
export class Responsavel {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', unique: true})
    email: string

    @Column({type: 'text'})
    senha: string

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    telefone: string

    @Column({type: 'text'})
    endereco: string
}