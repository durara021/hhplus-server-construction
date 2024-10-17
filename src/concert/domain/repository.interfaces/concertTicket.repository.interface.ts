import { Injectable } from "@nestjs/common";
import { ConcertTicketEntity } from "../entities/concertTicket.entity";


interface ConcertTicketRepositoryInterface{
    reservedTickets(concertTicketEntity: ConcertTicketEntity): Promise<ConcertTicketEntity[]>;
    reserve(concertTicketEntity: ConcertTicketEntity): Promise<ConcertTicketEntity>;
}

@Injectable()
export abstract class AbstractConcertTicketRepository implements ConcertTicketRepositoryInterface{
    abstract reservedTickets(concertTicketEntity: ConcertTicketEntity): Promise<ConcertTicketEntity[]>;
    abstract reserve(concertTicketEntity: ConcertTicketEntity): Promise<ConcertTicketEntity>;
}