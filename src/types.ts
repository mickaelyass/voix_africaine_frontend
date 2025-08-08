// src/types.ts
export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'user' | 'admin';
  token?: string;
}