import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { generateOTP } from '../../helpers/otp-generator';
import { log } from 'console';
import { UserLoginDto } from './dto/login-user-dto';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private usersRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto, res: Response) {
    if (await this.usersRepo.findOne({ where: { phone: createUserDto.phone } })) return {status: "failed", message: "user is duplicating"}
      createUserDto.password = v4();
    const pass = createUserDto.password;
    createUserDto.password = await bcrypt.hash(createUserDto.password, 7);
    // this.mailService.sendMailClient()
    const newUser = await this.usersRepo.create(createUserDto);
    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateUser = await this.usersRepo.update(
      { hashed_refresh_token },
      {
        where: { id: newUser.id },
        returning: true,
      },
    );

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

  findOne(id: number) {
    return this.usersRepo.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updated_data = this.usersRepo.update(updateUserDto, {
      where: { id: id },
    });
    return {
      status: 'success',
      messgae: 'the user updated successfully',
      updated_data,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async phone_is_exists(id: number) {
    const res = (await this.usersRepo.findByPk(id))?.phone != null;
    return res;
  }

  async email_is_exists(id: number) {
    const res = (await this.usersRepo.findByPk(id))?.email != null;
    return res;
  }

  async getTokens(user: User) {
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

  async login(loginUserDto: UserLoginDto, res: Response) {
    const { phone, password } = loginUserDto;
    const user = await this.usersRepo.findOne({ where: { phone } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateUser = await this.usersRepo.update(
      { hashed_refresh_token },
      {
        where: { id: user.id },
        returning: true,
      },
    );

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
}
