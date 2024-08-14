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
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

export const publicUserColumns = Object.freeze([
  'id',
  'name',
  'surname',
  'email',
  //   'password',
  'phone',
  'age',
  'country',
  'district',
  'role',
  'created_at',
  'updated_at',
]);
