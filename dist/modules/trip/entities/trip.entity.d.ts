import { Model } from 'sequelize-typescript';
import { Journey } from '../../journey/entities/journey.entity';
interface ITripCreationAttr {
    from: string;
    to: string;
    beginning_time: Date;
    ending_time: Date;
    journey_id: number;
    passangers: number;
    seats: number[];
    price: number;
    boarding: number;
    coment: string;
}
export declare class Trip extends Model<Trip, ITripCreationAttr> {
    id: number;
    from: string;
    to: string;
    beginning_time: Date;
    ending_time: Date;
    journey_id: number;
    passangers: number;
    seats: number[];
    price: number;
    boarding: number;
    coment: string;
    journey: Journey;
}
export {};
