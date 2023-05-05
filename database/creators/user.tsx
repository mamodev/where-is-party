import bcrypt from "bcrypt";
import { Pool, Client } from "pg";
import { db } from "../db";
import { query, uuid } from "../utils";

type UserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function createUser(user: UserParams) {
  // Generate a hashed password using bcrypt
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Convert the hashed password to binary using a Buffer
  const binaryPassword = Buffer.from(hashedPassword, "utf-8");

  // Store the user data in the user table
  return await query(
    db,
    `
      INSERT INTO core.user (
        id, 
        profile_image, 
        first_name, 
        last_name, 
        password_hash, 
        email, 
        access_revoked, 
        date_joined, 
        staff_roles
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `,
    [
      uuid(),
      null,
      user.firstName,
      user.lastName,
      binaryPassword,
      user.email,
      false,
      new Date(),
      {},
    ]
  );
}
