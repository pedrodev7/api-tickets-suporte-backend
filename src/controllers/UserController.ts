import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import brcrypt from 'bcrypt'

export class UserController {

    async create(req: Request, res: Response){
        const { nome, email, senha } = req.body

        const existUser = await userRepository.findOneBy({email})

        if(existUser){
            return res.status(404).json({message: 'Email já existe'})
        }

        const hashSenha = await brcrypt.hash(senha, 10);
        const user =  userRepository.create({email, senha: hashSenha, nome})
        await userRepository.save(user);

        const {senha: _senha, ...newUser} = user;

        res.status(201).json(newUser);
    }
}