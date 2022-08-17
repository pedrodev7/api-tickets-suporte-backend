import { Request, Response } from "express";
import { empresaRepository } from "../repositories/empresaRepository";

export class EmpresaController{


    /**
     * Metodo de criar uma Empresa e cadastrar no banco de dados
     */
    async create(req: Request, res: Response){
        const {nome, cnpj, descricao } = req.body;

        if(!nome || !cnpj || !descricao){
            return res.status(400).json({message: "Um ou mais campos Vazio"})
        }

        try {
            const newEmpresa = empresaRepository.create({nome, cnpj, descricao})
            await empresaRepository.save(newEmpresa);
            
            return res.status(201).json(newEmpresa);
        } catch (error) {
            return res.status(500).json({menssagem: "Internal Server Error"})
        }
    }

    /**
     * Metodo de alterar uma empresa no Banco de Dados
     */
    async update(req: Request, res:Response){
        const {nome, cnpj, descricao} = req.body;
        const {idEmpresa} = req.params;

        const updateEmpresa = await empresaRepository.findOneBy({id: Number(idEmpresa)})

        await empresaRepository.update(idEmpresa,{
            ...updateEmpresa,
            nome: nome,
            cnpj: cnpj,
            descricao: descricao
        })

        return res.status(200).json(updateEmpresa);
    }


    /**
     * Metodo de retornar todas as empresas
     */

    async read(req: Request, res: Response){
        const getAllEmpresa = await empresaRepository.find();

        return res.status(200).json(getAllEmpresa);
    }

    /**
     * Metodo que retorna a empresa pelo ID
     */

    async readById(req: Request, res: Response){
        const { idEmpresa } = req.params;

        if(!idEmpresa){
            return res.status(400).json({message: "VAZIO"})
        }

        const getByIdEmpresa = await empresaRepository.findOneBy({id: Number(idEmpresa)});
        return res.status(200).json(getByIdEmpresa);
    }
}