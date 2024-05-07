import { Model } from 'sequelize-typescript';
interface ITicketCreationAttr {
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    trip_ids: number[];
    seat_id: number[];
    ticket_unique_id: string;
    is_active: boolean;
}
export declare class Ticket extends Model<Ticket, ITicketCreationAttr> {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    trip_ids: number[];
    seat_ids: [number[]];
    ticket_unique_id: string;
    is_active: boolean;
}
export {};
