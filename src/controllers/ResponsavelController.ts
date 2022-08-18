import { Request, Response } from "express";
import { responsavelRepository } from "../repositories/responsavelRepository";
import bcrypt from 'bcrypt'

export class ResponsavelController{

    async create(req: Request, res: Response){
        const {nome, telefone, endereco, email, senha} = req.body;   

        const existResponsavel = await responsavelRepository.findOneBy({email});

        if(existResponsavel){
            res.status(400).json({message: 'Email já existe.'})
        }

        const hashSenha = await bcrypt.hash(senha, 10);
        const novoResponsavel = responsavelRepository.create({
            nome, 
            telefone, 
            endereco, 
            email, 
            senha: hashSenha
        });

        await responsavelRepository.save(novoResponsavel);

        const {senha: _senha, ...responsavel} = novoResponsavel

        return res.status(201).json(responsavel);
    }

}