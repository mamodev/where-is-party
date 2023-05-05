import { DefaultSession } from "next-auth";

interface IUser {
  id: string;
  profile_image: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  last_login: string | null;
  access_revoked: false;
  date_joined: string | null;
  staff_roles: {};
  created_at: string | null;
  updated_at: string | null;
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
