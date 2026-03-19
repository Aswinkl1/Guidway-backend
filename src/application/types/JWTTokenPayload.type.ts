import { type Role } from '@domain/entities/user';

export interface JWTTokenPaylod {
  id: string;
  role: Role;
}
