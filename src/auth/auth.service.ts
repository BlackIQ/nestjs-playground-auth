import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupAuthDto } from './dto/signup-auth.dto.js';
import { SigninAuthDto } from './dto/signin-auth.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupAuthDto: SignupAuthDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: signupAuthDto.email },
    });

    if (existingEmail) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: signupAuthDto.username },
    });

    if (existingUsername) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    signupAuthDto.password = await bcrypt.hash(signupAuthDto.password, 10);

    const { password, ...userData } = await this.prisma.user.create({
      data: signupAuthDto,
    });

    return userData;
  }

  async signin(signinAuthDto: SigninAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signinAuthDto.email },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isValidPassword = await bcrypt.compare(
      signinAuthDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password, ...userData } = user;

    return userData;
  }
}
