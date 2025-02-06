export enum UserRole {
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  PSYCHOLOGIST = 'psychologist',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}