export interface IUser {
  userId: string;
  email: string;
  name: string;
  role: TUser;
}

export type TUser = "Admin" | "Rider" | "Driver";
