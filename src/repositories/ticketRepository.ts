import { appDataSource } from "../data-source";
import { Ticket } from "../entidades/Ticket";

export const ticketRepository = appDataSource.getRepository(Ticket);