import { User } from "../entidades/User";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>
        }
    }
}