import { NextFunction, Request, Response } from "express";
import { responsavelRepository } from "../repositories/responsavelRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type JwtPayload = {
	id: number
}

export class LoginController {

    async signIn(req: Request, res: Response){
        const {email, senha} = req.body;

        const responsavel = await responsavelRepository.findOneBy({email});

        if(!responsavel){
            return res.status(400).json({message: 'E-mail ou senha inválidos'})
        }

        const verificarSenha = await bcrypt.compare(senha, responsavel.senha);

        if(!verificarSenha){
            throw res.status(400).json({message: 'E-mail ou senha inválidos'})
        }

        const token = jwt.sign({id: responsavel.id}, process.env.JWT_PASS ?? '', {
            expiresIn: '1h'
        });

        const {
            senha: _senha,
            telefone: _telefone,
            endereco: _endereco, 
            ...loginResponsavel
        } = responsavel

        return res.json({
            responsavel: loginResponsavel,
            token: token
        })
    }

    async getProfile(req: Request, res: Response, next: NextFunction){
        return res.json(req.user);
    }  
}