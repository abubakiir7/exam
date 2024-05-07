import { Model } from 'sequelize-typescript';
interface IUserModelCreationAttr {
    id: number;
    phone: string;
    password: string;
    hashed_refresh_token: string;
}
export declare class User extends Model<IUserModelCreationAttr, User> {
    id: number;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: 'erkak' | 'ayol';
    password: string;
    hashed_refresh_token: string;
}
export {};
