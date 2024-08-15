import { IUser } from "@/interfaces/users/users.interface";
import moment from "moment";

const userItemMap = (user: IUser): IUser => {
  return {
    ...user,
    created_at: moment(user.created_at).format("DD/MM/YYYY"),
    updated_at: moment(user.updated_at).format("DD/MM/YYYY"),
  };
};

const userMapper = (user: IUser[]): IUser[] => {
  return user.map(userItemMap);
};

export { userMapper, userItemMap };
