import { IGeneralPaginationResponse } from 'src/interfaces/general.interfaces';
import { IUser } from '../user.interface';

export interface GetUsersResponse {
  data: IUser[];
  pagination: IGeneralPaginationResponse;
}

export interface GetUserByIdResponse {
  data: IUser | null;
}
