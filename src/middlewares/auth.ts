import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/UserRepository";

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
        const user = await userRepository.findOneBy({id})

        if(!user){
            throw new Error('Não Autorizado')
        }
        
        const {
            senha: _senha, 
            ...userLogado
        } = user

        req.user = userLogado;

        next();
    }

}