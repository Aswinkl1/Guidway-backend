export type UserJWTTokenPaylod = {
  id: string;
  role: "student";
};

export type MentroJWTTokenPaylod = {
  id: string;
  role: "mentor";
};

export type AdminJWTTokenPaylod = {
  id: string;
  role: "admin";
};

export type JWTTokenPaylod =
  | UserJWTTokenPaylod
  | AdminJWTTokenPaylod
  | MentroJWTTokenPaylod;

export type JWTTokenPaylodRoleField = JWTTokenPaylod["role"];
