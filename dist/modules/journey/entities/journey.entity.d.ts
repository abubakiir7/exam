import { Model } from 'sequelize-typescript';
import { Transport } from '../../transport/entities/transport.entity';
declare class IJourneyCreationAttr {
    origin: string;
    destination: string;
    beginning_time: Date;
    ending_time: Date;
    price: number;
}
export declare class Journey extends Model<Journey, IJourneyCreationAttr> {
    id: number;
    origin: string;
    destination: string;
    beginning_time: Date;
    ending_time: Date;
    transport_id: number;
    transport: Transport;
}
export {};
