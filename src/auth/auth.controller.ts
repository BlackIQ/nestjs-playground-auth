import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupAuthDto } from './dto/signup-auth.dto.js';
import { SigninAuthDto } from './dto/signin-auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body(ValidationPipe) signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @Post()
  signin(@Body(ValidationPipe) signinAuthDto: SigninAuthDto) {
    return this.authService.signin(signinAuthDto);
  }
}
