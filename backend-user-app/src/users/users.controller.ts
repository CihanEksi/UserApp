import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationQuery } from './dto/pagination.dto';
import { GetUsersResponse } from './interfaces/responses/usersResponse.interface';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers(@Query() query: PaginationQuery): Promise<GetUsersResponse> {
    try {
      const result = this.usersService.getUsers({
        query,
      });
      return result;
    } catch (error) {
      console.error('Error getting users:', error);
      throw new NotFoundException('Error getting users');
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<IUser | null> {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post('save')
  async saveUser(@Body() user: CreateUserDto): Promise<IUser> {
    try {
      const result = await this.usersService.saveUser(user);
      return result;
    } catch (error) {
      console.error('Error while saving user:', error);
      throw new Error('Error while saving user');
    }
  }
}
