import { appDataSource } from "../data-source";
import { User } from "../entidades/User";

export const userRepository = appDataSource.getRepository(User);