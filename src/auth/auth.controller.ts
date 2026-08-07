import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { SignupAuthDto } from './dto/signup-auth.dto.js';
import { SigninAuthDto } from './dto/signin-auth.dto.js';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @Post('signin')
  signin(@Body() signinAuthDto: SigninAuthDto) {
    return this.authService.signin(signinAuthDto);
  }
}
