import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMailClient(text: string, to: string, datas: {
        name: string;
    }): Promise<void>;
}
