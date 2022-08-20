import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userRepository } from "../repositories/UserRepository";

export class LoginController {

    async signIn(req: Request, res: Response){
        const {email, senha} = req.body;

        const user = await userRepository.findOneBy({email});

        if(!user){
            return res.status(400).json({message: 'E-mail ou senha inválidos'})
        }

        const verificarSenha = await bcrypt.compare(senha, user.senha);

        if(!verificarSenha){
            return res.status(400).json({message: 'E-mail ou senha inválidos'})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {
            expiresIn: '1h'
        });

        const {
            senha: _senha, 
            ...loginUser
        } = user

        return res.json({
            responsavel: loginUser,
            token: token
        })
    }

    async getProfile(req: Request, res: Response, next: NextFunction){
        return res.json(req.user);
    }  
}