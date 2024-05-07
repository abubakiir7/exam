import { Model } from "sequelize-typescript";
interface ISeatsCretionAttr {
    transport_id: number;
}
export declare class Seats extends Model<Seats, ISeatsCretionAttr> {
    id: number;
    transport_id: number;
}
export {};
