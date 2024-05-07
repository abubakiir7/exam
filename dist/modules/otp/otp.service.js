"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const otp_entity_1 = require("./entities/otp.entity");
const sequelize_1 = require("@nestjs/sequelize");
const otp_generator_1 = require("../../helpers/otp-generator");
const add_minutes_1 = require("../../helpers/add-minutes");
const console_1 = require("console");
const mail_service_1 = require("../mail/mail.service");
let OtpService = class OtpService {
    constructor(otpRepo, mailService) {
        this.otpRepo = otpRepo;
        this.mailService = mailService;
    }
    async generateOtp(phone) {
        const otp = (0, otp_generator_1.generateOTP)(4);
        const expiration_time = (0, add_minutes_1.addMinutesToDate)(new Date(), 1);
        this.otpRepo.destroy({ where: { phone } });
        this.otpRepo.create({ otp, expiration_time, phone });
        const saved_data = await this.otpRepo.create({ otp, expiration_time });
        return saved_data.id;
    }
    async verifyOtp(otp, uuid) {
        const saved_otp = await this.otpRepo.findOne({ where: { id: uuid } });
        (0, console_1.log)(saved_otp.expiration_time, new Date());
        if (saved_otp.expiration_time < new Date())
            return { message: 'otp expired' };
        if (saved_otp.otp !== otp)
            return { message: 'otp is not correct' };
        return { message: 'success' };
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(otp_entity_1.Otp)),
    __metadata("design:paramtypes", [Object, mail_service_1.MailService])
], OtpService);
//# sourceMappingURL=otp.service.js.map