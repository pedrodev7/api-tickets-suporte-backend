import { appDataSource } from "../data-source";
import { Empresa } from "../entidades/Empresa";


export const empresaRepository = appDataSource.getRepository(Empresa)