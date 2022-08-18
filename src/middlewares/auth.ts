import { NextFunction, Request, Response } from "express";
import { responsavelRepository } from "../repositories/responsavelRepository";
import jwt from 'jsonwebtoken';

type JwtPayload = {
	id: number
}

export class Auth {

    async authMiddleware(req: Request, res: Response, next: NextFunction){
        const { authorization } = req.headers;

        if(!authorization){
            return res.status(401).json({message: "Não autorizado"})
        }

        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload
        const responsavel = await responsavelRepository.findOneBy({id})

        if(!responsavel){
            throw new Error('Não Autorizado')
        }
        
        const {
            senha: _senha, 
            telefone: _telefone,
            endereco: _endereco, 
            ...responsavelLogado
        } = responsavel

        req.user = responsavelLogado;

        next();
    }

}