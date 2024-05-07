import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
export declare class TicketsService {
    private ticketRepo;
    constructor(ticketRepo: typeof Ticket);
    create(createTicketDto: CreateTicketDto): Promise<Ticket>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTicketDto: UpdateTicketDto): string;
    remove(id: number): string;
}
