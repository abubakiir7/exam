import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/login-user-dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, res: Response): Promise<{
        status: string;
        message: string;
        password?: undefined;
    } | {
        status: string;
        message: string;
        password: string;
    }>;
    findAll(): Promise<import("src/modules/user/entities/user.entity").User[]>;
    findOne(id: string): Promise<import("src/modules/user/entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        status: string;
        messgae: string;
        updated_data: Promise<[affectedCount: number]>;
    }>;
    remove(id: string): string;
    phone_is_exists(id: {
        id: number;
    }): Promise<boolean>;
    email_is_exists(id: {
        id: number;
    }): Promise<boolean>;
    login(userLoginDto: UserLoginDto, res: Response): Promise<{
        message: string;
        user: import("src/modules/user/entities/user.entity").User;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
}
