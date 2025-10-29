export interface IUser {
  id: string;
  email: string;
  role: TUser;
}

export type TUser = "Admin" | "Rider" | "Driver";
