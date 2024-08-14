import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationQuery } from './dto/pagination.dto';
import { GetUsersResponse } from './interfaces/responses/usersResponse.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers(@Query() query: PaginationQuery): Promise<GetUsersResponse> {
    return this.usersService.getUsers({
      query,
    });
  }
}
