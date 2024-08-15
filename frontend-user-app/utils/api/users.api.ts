import axios from "axios";
import { IUser } from "@/interfaces/users/users.interface";
import { PaginationResponse } from "@/interfaces/response/pagination.response.interface";
import { config } from "dotenv";
config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/users`;

interface IGetUsersResponse {
  data: IUser[];
  pagination: PaginationResponse;
}
export const getUsers = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
): Promise<IGetUsersResponse> => {
  try {
    let url = `${API_URL}?page=${page}&pageSize=${pageSize}`;
    if (search) {
      url += `&search=${search}`;
    }
    const response = await axios.get<IGetUsersResponse>(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const saveUser = async (
  user: Omit<IUser, "id" | "created_at" | "updated_at">
): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>(`${API_URL}/save`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: Error | any) {
    console.log(error, "error saveUser");
    console.log(error.response, "error response saveUser");
    throw new Error(error.response.data.message || "Failed to save user");
  }
};

export const updateUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>(`${API_URL}/update`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};
