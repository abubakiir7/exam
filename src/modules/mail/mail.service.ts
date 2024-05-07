import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { log } from 'console';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailClient(text: string, to: string, datas: {name: string}) {
    await this.mailerService.sendMail({
      to: to,
      subject: text,
      template: './confirmation',
      context: {
        name: datas.name,
      }, 
    });
  }

  // async sendMailAdmin(admin: Admin) {
  //   const url = `${process.env.API_HOST}:${process.env.PORT}/api/admin/activate/${admin.activation_link}`;
  //   log(url);
  //   await this.mailerService.sendMail({
  //     to: admin.email,
  //     subject: 'Welcome to Hospital App! Confirmation your email',
  //     template: './confirmation',
  //     context: {
  //       name: admin.name,
  //       url,
  //     },
  //   });
  // }

  // async sendMailDoctor(doctor: Doctor) {
  //   const url = `${process.env.API_HOST}:${process.env.PORT}/api/doctor/activate/${doctor.activation_link}`;
  //   log(url);
  //   await this.mailerService.sendMail({
  //     to: doctor.email,
  //     subject: 'Welcome to Hospital App! Confirmation your email',
  //     template: './confirmation',
  //     context: {
  //       name: doctor.full_name,
  //       url,
  //     },
  //   });
  // }
}
