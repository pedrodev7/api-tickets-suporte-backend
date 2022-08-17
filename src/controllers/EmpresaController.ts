import { Request, Response } from "express";
import { empresaRepository } from "../repositories/empresaRepository";

export class EmpresaController {


    /**
     * Metodo de criar uma Empresa e cadastrar no banco de dados
     */
    async create(req: Request, res: Response) {
        const { nome, cnpj, descricao } = req.body;

        if (!nome || !cnpj || !descricao) {
            return res.status(400).json({ message: "Um ou mais campos Vazio" })
        }

        try {
            const empresa = empresaRepository.create({ nome, cnpj, descricao })
            await empresaRepository.save(empresa);

            return res.status(201).json(empresa);
        } catch (error) {
            return res.status(500).json({ menssagem: "Internal Server Error" })
        }
    }

    /**
     * Metodo de alterar uma empresa no Banco de Dados
     */
    async update(req: Request, res: Response) {
        const { nome, cnpj, descricao } = req.body;
        const { idEmpresa } = req.params;

        if (!idEmpresa) {
            return res.status(400).json({ message: "Campo Nulo" })
        }

        try {
            const empresa = await empresaRepository.findOneBy({ id: Number(idEmpresa) })

            await empresaRepository.update(idEmpresa, {
                ...empresa,
                nome: nome,
                cnpj: cnpj,
                descricao: descricao
            })

            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(500).json({ menssagem: "Internal Server Error" })
        }
    }

    /**
     * Metodo de retornar todas as empresas
     */
    async read(req: Request, res: Response) {


        try {
            const empresa = await empresaRepository.find();
            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(500).json({ menssagem: "Internal Server Error" })
        }
    }

    /**
     * Metodo que retorna a empresa pelo ID
     */
    async readById(req: Request, res: Response) {
        const { idEmpresa } = req.params;

        if (!idEmpresa) {
            return res.status(400).json({ message: "VAZIO" })
        }

        try {
            const empresa = await empresaRepository.findOneBy({ id: Number(idEmpresa) });
            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(500).json({ menssagem: "Internal Server Error" })
        }
    }

    /**
     * Metodo que exclui uma Empresa
     */
    async remove(req: Request, res: Response) {
        const { idEmpresa } = req.params;

        if (!idEmpresa) {
            return res.status(400).json({ message: "Campo Invalido" })
        }

        try {
            await empresaRepository.delete({ id: Number(idEmpresa) });
            return res.status(200).json("OK");
        } catch (error) {
            return res.status(500).json({ menssagem: "Internal Server Error" })
        }
    }
}