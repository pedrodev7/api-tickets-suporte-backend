import { Responsavel } from "../entidades/Responsavel";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<Responsavel>
        }
    }
}