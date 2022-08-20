import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity('tickets')
export class Ticket {

    @PrimaryColumn()
    id: string
    
    @Column({type: 'text'})
    titulo: string

    @CreateDateColumn()
    dataCreated: Date

    @Column({nullable: true})
    dataUpdated: Date
    
    @Column({type: 'text'})
    status: string

    @Column({type: 'text'})
    local: string

    @ManyToOne(() => Cliente, cliente => cliente.ticket)
    @JoinColumn({name: 'cliente_id'})
    cliente: Cliente

    // responsavel: Responsavel
}