import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
export declare class UserService {
    private usersRepo;
    private readonly jwtService;
    private readonly mailService;
    constructor(usersRepo: typeof User, jwtService: JwtService, mailService: MailService);
    create(createUserDto: CreateUserDto, res: Response): Promise<{
        status: string;
        message: string;
        password?: undefined;
    } | {
        status: string;
        message: string;
        password: string;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        status: string;
        messgae: string;
        updated_data: Promise<[affectedCount: number]>;
    }>;
    remove(id: number): string;
    phone_is_exists(id: number): Promise<boolean>;
    email_is_exists(id: number): Promise<boolean>;
    getTokens(user: User): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(loginUserDto: UserLoginDto, res: Response): Promise<{
        message: string;
        user: User;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
}
