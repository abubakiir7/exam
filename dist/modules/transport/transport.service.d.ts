import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { Transport } from './entities/transport.entity';
import { Seats } from './entities/seats.entity';
export declare class TransportService {
    private transportRepo;
    private seatRepo;
    constructor(transportRepo: typeof Transport, seatRepo: typeof Seats);
    create(createTransportDto: CreateTransportDto): Promise<{
        status: string;
        message: string;
        transport: Transport;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        transport: Transport[];
    } | {
        status: string;
        message: string;
        transport?: undefined;
    }>;
    findOne(id: number): string;
    update(id: number, updateTransportDto: UpdateTransportDto): string;
    remove(id: number): string;
}
