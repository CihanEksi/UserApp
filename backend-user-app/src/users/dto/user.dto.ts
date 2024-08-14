import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
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

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
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
