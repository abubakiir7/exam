import { TransportService } from './transport.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
export declare class TransportController {
    private readonly transportService;
    constructor(transportService: TransportService);
    create(createTransportDto: CreateTransportDto): Promise<{
        status: string;
        message: string;
        transport: import("src/modules/transport/entities/transport.entity").Transport;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        transport: import("src/modules/transport/entities/transport.entity").Transport[];
    } | {
        status: string;
        message: string;
        transport?: undefined;
    }>;
    findOne(id: string): string;
    update(id: string, updateTransportDto: UpdateTransportDto): string;
    remove(id: string): string;
}
