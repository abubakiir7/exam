import { Model } from 'sequelize-typescript';
import { Seats } from './seats.entity';
interface ITransportCreationAttr {
    raw: number;
    column: number;
}
export declare class Transport extends Model<Transport, ITransportCreationAttr> {
    id: number;
    raw: number;
    column: number;
    seats: number;
    transportSeats: Seats[];
}
export {};
