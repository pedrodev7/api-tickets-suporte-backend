import { appDataSource } from "../data-source";
import { Cliente } from "../entidades/Cliente";

export const clienteRepository = appDataSource.getRepository(Cliente)