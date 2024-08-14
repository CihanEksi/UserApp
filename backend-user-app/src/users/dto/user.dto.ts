import { IsString, IsEmail, IsNumber } from 'class-validator';
export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  country: string;
  district: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsNumber()
  age: number;

  @IsString()
  country: string;

  @IsString()
  district: string;
}
