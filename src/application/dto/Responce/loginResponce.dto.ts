import { User } from "@domain/entities/user";

export interface AuthUserDTO {
  id: number;
  name: string;
  email: string;
  role: "mentor" | "mentee" | "admin";
}

export interface LoginResponceDTO {
  user: User;
  accessToken: string;
  refreshToken: string;
}
