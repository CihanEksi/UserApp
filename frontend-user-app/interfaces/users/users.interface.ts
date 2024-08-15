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
    created_at: Date | string;
    updated_at: Date | string;
  }
  