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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("./entities/user.entity");
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(usersRepo, jwtService, mailService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async create(createUserDto, res) {
        if (await this.usersRepo.findOne({ where: { phone: createUserDto.phone } }))
            return { status: "failed", message: "user is duplicating" };
        createUserDto.password = (0, uuid_1.v4)();
        const pass = createUserDto.password;
        createUserDto.password = await bcrypt.hash(createUserDto.password, 7);
        const newUser = await this.usersRepo.create(createUserDto);
        const tokens = await this.getTokens(newUser);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const updateUser = await this.usersRepo.update({ hashed_refresh_token }, {
            where: { id: newUser.id },
            returning: true,
        });
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return {
            status: 'success',
            message: 'user created successfully',
            password: pass,
        };
    }
    findAll() {
        return this.usersRepo.findAll({});
    }
    findOne(id) {
        return this.usersRepo.findByPk(id);
    }
    async update(id, updateUserDto) {
        const updated_data = this.usersRepo.update(updateUserDto, {
            where: { id: id },
        });
        return {
            status: 'success',
            messgae: 'the user updated successfully',
            updated_data,
        };
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async phone_is_exists(id) {
        const res = (await this.usersRepo.findByPk(id))?.phone != null;
        return res;
    }
    async email_is_exists(id) {
        const res = (await this.usersRepo.findByPk(id))?.email != null;
        return res;
    }
    async getTokens(user) {
        const payload = {
            id: user.id,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async login(loginUserDto, res) {
        const { phone, password } = loginUserDto;
        const user = await this.usersRepo.findOne({ where: { phone } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isMatchPass = await bcrypt.compare(password, user.password);
        if (!isMatchPass) {
            throw new common_1.BadRequestException('Password do not match');
        }
        const tokens = await this.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const updateUser = await this.usersRepo.update({ hashed_refresh_token }, {
            where: { id: user.id },
            returning: true,
        });
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        const response = {
            message: 'User logged in',
            user: updateUser[1][0],
            tokens,
        };
        return response;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map