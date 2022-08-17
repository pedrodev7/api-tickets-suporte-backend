import { appDataSource } from "../data-source";
import { Local } from "../entidades/Local";


export const localRepository = appDataSource.getRepository(Local);