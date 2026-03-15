import { User } from "@domain/entities/user";

export interface AuthUserDTO {
  id: number;
  name: string;
  email: string;
  role: "mentor" | "mentee" | "admin";
}

export interface LoginResponceDTO {
  role: "mentor" | "mentee" | "admin";
  accessToken: string;
  refreshToken: string;
}
