export interface UserJWTTokenPaylod {
  id: string;
  role: 'mentee';
}

export interface MentroJWTTokenPaylod {
  id: string;
  role: 'mentor';
}

export interface AdminJWTTokenPaylod {
  id: string;
  role: 'admin';
}

export type JWTTokenPaylod = UserJWTTokenPaylod | AdminJWTTokenPaylod | MentroJWTTokenPaylod;

export type JWTTokenPaylodRoleField = JWTTokenPaylod['role'];
