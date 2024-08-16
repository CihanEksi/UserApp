import { Injectable } from '@nestjs/common';
import { publicUserColumns, IUser } from './interfaces/user.interface';
import { DatabaseService } from 'src/database/database.service';
import { PaginationQuery } from './dto/pagination.dto';
import { GetUsersResponse } from './interfaces/responses/usersResponse.interface';
import { TABLES } from 'src/database/database.enums';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { hashUnRecoveable } from 'src/utils/encryption';
import { USER_ROLE } from './enums/user.enum';
import { IUpsertInterface } from 'src/database/interfaces/database.interface';
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
      whereQuery += ` WHERE name LIKE ? OR surname LIKE ?`;
      query += whereQuery;
      queryValues.push(`%${search}%`, `%${search}%`);
    }
    query += ` ORDER BY id DESC `;

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

  async getUserById(id: number): Promise<IUser> {
    const query = `SELECT ${publicUserColumns.join(', ')} from ${TABLES.users} WHERE id = ?`;
    const queryResult = await this.mysql2.query(query, [id]);
    return queryResult?.[0] as IUser;
  }

  async saveUser(user: CreateUserDto): Promise<IUser> {
    const userData = {
      ...user,
      password: await hashUnRecoveable(user.password),
      role: USER_ROLE.user,
    };

    const checkAlreadyExistQuery = `SELECT id from ${TABLES.users} WHERE email = ?`;
    const checkAlreadyExistResult = (await this.mysql2.query(
      checkAlreadyExistQuery,
      [userData.email],
    )) as IUser[];

    if (checkAlreadyExistResult?.length) {
      throw new Error('User already exist');
    }

    const keys = Object.keys(userData);
    const values = Object.values(userData);

    const query = `INSERT INTO ${TABLES.users} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;
    const queryResult = (await this.mysql2.query(
      query,
      values,
    )) as IUpsertInterface;

    const createdDataId = queryResult?.insertId;

    if (!createdDataId) {
      throw new Error('Error while creating user');
    }

    const getUser = await this.getUserById(createdDataId);

    return getUser as IUser;
  }

  async updateUser(userDto: UpdateUserDto): Promise<any> {
    const updateData = { ...userDto };

    if (updateData.password) {
      updateData.password = await hashUnRecoveable(updateData.password);
    }

    const keys = Object.keys(updateData);
    const values = Object.values(updateData);

    const checkQuery = `SELECT email from ${TABLES.users} WHERE email = ?`;
    const checkResult = (await this.mysql2.query(checkQuery, [
      updateData.email,
    ])) as IUser[];

    if (checkResult?.length) {
      throw new Error('User email already exist and cannot be duplicated');
    }

    const query = `UPDATE ${TABLES.users} SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`;

    const queryResult = (await this.mysql2.query(query, [
      ...values,
      updateData.id,
    ])) as IUpsertInterface;

    if (!queryResult?.affectedRows) {
      throw new Error('Error while updating user');
    }

    const getUser = await this.getUserById(updateData.id);

    return getUser as IUser;
  }
}
