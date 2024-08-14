import { Injectable } from '@nestjs/common';
import { publicUserColumns, IUser } from './interfaces/user.interface';
import { DatabaseService } from 'src/database/database.service';
import { PaginationQuery } from './dto/pagination.dto';
import { GetUsersResponse } from './interfaces/responses/usersResponse.interface';
import { TABLES } from 'src/database/database.enums';
interface GetUsersParams {
  query: PaginationQuery;
}

@Injectable()
export class UsersService {
  constructor(private readonly mysql2: DatabaseService) {}

  async getUsers(params: GetUsersParams): Promise<GetUsersResponse> {
    const { page, pageSize, search } = params.query;

    const select = publicUserColumns.join(', ');
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    let query = `SELECT ${select} from ${TABLES.users}`;

    const queryValues = [];
    let whereQuery = '';

    if (search) {
      whereQuery += ` WHERE name LIKE ? OR surname LIKE ? OR email LIKE ?`;
      query += whereQuery;
      queryValues.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` LIMIT ${pageSize} OFFSET ${skip}`;
    const queryResultPromise = this.mysql2.query(query, queryValues);

    let countQuery = `SELECT COUNT(*) as total from ${TABLES.users}`;

    if (whereQuery) {
      countQuery += whereQuery;
    }

    const countPromise = this.mysql2.query(countQuery, queryValues);

    const [queryResult, countResult] = await Promise.all([
      queryResultPromise,
      countPromise,
    ]);

    const total = countResult?.[0].total || 0;

    const totalPage = Math.ceil(total / pageSize);

    const paginationInformation = {
      totalRow: total,
      page: page,
      totalPage: totalPage,
      pageSize: pageSize,
    };

    return {
      data: queryResult as IUser[],
      pagination: paginationInformation,
    };
  }
}
