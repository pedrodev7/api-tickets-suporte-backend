import { Request, Response } from "express";
import { responsavelRepository } from "../repositories/responsavelRepository";

export class ResponsavelController{

    async create(req: Request, res: Response){
        const {nome, telefone, endereco} = req.body;   

        const responsavel = responsavelRepository.create({
            nome, 
            telefone, 
            endereco
        });

        await responsavelRepository.save(responsavel);

        return res.status(201).json(responsavel);
    }

}