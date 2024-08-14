import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly mysql2: DatabaseService) {}

  
  async getUsers(): Promise<User[]> {
    const queryResult = await this.mysql2.query('SELECT * FROM users');
    return queryResult as User[];
  }
}
