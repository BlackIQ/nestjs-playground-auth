import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  me() {
    return 'Get user data';
  }
}
