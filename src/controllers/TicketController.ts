import { Request, Response } from "express";
import {v4 as uuid} from 'uuid'
import { clienteRepository } from "../repositories/ClienteRepository";
import { ticketRepository } from "../repositories/ticketRepository";

export class TickerController {

    async create(req: Request, res: Response){
        const { idCliente } = req.params
        const { local } = req.body;
        const id = uuid();

        try {
            const cliente = await clienteRepository.findOneBy({ id: Number(idCliente) })

            if(!cliente){
                return res.status(404).json({message: 'Cliente não Existe'})
            }

            const ticket = ticketRepository.create({
                id, 
                titulo: id + " " + local, 
                status: "PENDENTE",
                local,
                cliente: cliente
            })

            await ticketRepository.save(ticket);
            return res.status(201).json(ticket);
        } catch (error) {
            return res.status(404).json({ message: 'Internal Server Error' })
        }
    }
}