/// <reference types="node" />
import { OtpService } from './otp.service';
import { UUID } from 'crypto';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    create(phone: string): Promise<any>;
    verifyOtp(body: {
        otp: string;
        uuid: UUID;
    }): Promise<{
        message: string;
    }>;
}
