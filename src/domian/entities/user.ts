export class User {
  constructor(
    public id: number,
    public name: string,
    public password: string | null,
    public phoneNumber: number,
    public authProviderId: string | null,
    public role: "student" | "mentor" | "admin",
    public isDeleted: boolean,
    public isVerified: boolean,
    public isBlocked: boolean,
    public timezone: string,
    public createdAt: Date,
  ) {}
}
