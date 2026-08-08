import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupAuthDto } from './dto/signup-auth.dto.js';
import { SigninAuthDto } from './dto/signin-auth.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(signupAuthDto: SignupAuthDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: signupAuthDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: signupAuthDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(signupAuthDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...signupAuthDto,
        password: hashedPassword,
      },
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return {
      accessToken,
    };
  }

  async signin(signinAuthDto: SigninAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signinAuthDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(
      signinAuthDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return {
      accessToken,
    };
  }
}
