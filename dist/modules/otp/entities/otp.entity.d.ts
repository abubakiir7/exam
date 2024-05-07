import { Model } from 'sequelize-typescript';
interface IOtpCreationAttr {
    uuid: string;
    otp: number;
    expiration_time: Date;
    phone: string;
}
export declare class Otp extends Model<Otp, IOtpCreationAttr> {
    uuid: string;
    otp: number;
    expiration_time: Date;
    phone: string;
}
export {};
