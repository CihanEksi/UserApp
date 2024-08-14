import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationQuery } from './dto/pagination.dto';
import { GetUsersResponse } from './interfaces/responses/usersResponse.interface';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

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

  @Post('update')
  async updateUser(@Res() res, @Body() user: UpdateUserDto): Promise<IUser> {
    try {
      const result = await this.usersService.updateUser(user);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error while updating user:', error);
      throw new Error('Error while updating user');
    }
  }
}
