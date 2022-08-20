import { Request, Response } from "express";
import { clienteRepository } from "../repositories/ClienteRepository";

export class ClienteController {

    async create(req: Request, res: Response) {
        const { nome, telefone } = req.body;

        if (!nome || !telefone) {
            return res.status(400).json({ message: "Um ou mais campos Vazio" })
        }

        try {
            const cliente = clienteRepository.create({ nome, telefone })
            await clienteRepository.save(cliente);

            return res.status(201).json(cliente);
        } catch (error) {
            return res.status(500).json({ menssagem: "Internal Server Error" })
        }
    }
}