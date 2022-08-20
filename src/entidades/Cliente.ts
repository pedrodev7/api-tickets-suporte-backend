import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";

@Entity('clientes')
export class Cliente{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    telefone: string

    @OneToMany(() => Ticket, ticket => ticket.cliente)
    ticket: Ticket[]
}