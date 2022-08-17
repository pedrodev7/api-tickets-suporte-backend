import { Request, Response } from "express";
import { empresaRepository } from "../repositories/empresaRepository";
import { localRepository } from "../repositories/localRepository";

export class LocalController{

    async create(req: Request, res: Response){
        const {nome, endereco} = req.body;
        const { idEmpresa } = req.params;

        try {        
            const empresa = await empresaRepository.findOneBy({id: Number(idEmpresa)})
            
            if(!empresa){
                return res.status(400).json({message: 'Empresa não existe'})
            }
            
            const local = localRepository.create({nome,endereco,empresa})

            await localRepository.save(local);
            return res.status(201).json(local);

        } catch (error) {
            return res.status(404).json({ message: 'Internal Server Error' })
        }
    }

    async list(req: Request, res: Response){
        try {
            const local = await localRepository.find({
                relations: {
                    empresa: true,
                }
            });

            return res.status(200).json(local);
        } catch (error) {
            return res.status(500).json({ menssagem: 'Internal Server Error' })
        }
    }
}