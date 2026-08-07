import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto.js';
import { SigninAuthDto } from './dto/signin-auth.dto.js';

@Injectable()
export class AuthService {
  signup(signupAuthDto: SignupAuthDto) {
    return signupAuthDto;
  }

  signin(signinAuthDto: SigninAuthDto) {
    return signinAuthDto;
  }
}
