import { appDataSource } from "../data-source"
import { Responsavel } from "../entidades/Responsavel"

export const responsavelRepository = appDataSource.getRepository(Responsavel)