/// <reference types="node" />
import { Otp } from './entities/otp.entity';
import { UUID } from 'crypto';
import { MailService } from '../mail/mail.service';
export declare class OtpService {
    private otpRepo;
    private readonly mailService;
    constructor(otpRepo: typeof Otp, mailService: MailService);
    generateOtp(phone: string): Promise<any>;
    verifyOtp(otp: number, uuid: UUID): Promise<{
        message: string;
    }>;
}
