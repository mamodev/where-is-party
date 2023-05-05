import { Pool } from "pg";

function getDbEnv() {
  const database = process.env.DB_NAME;
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const port = process.env.DB_PORT;
  const password = process.env.DB_PASSWORD;

  if (
    !database ||
    !password ||
    !user ||
    !port ||
    !host ||
    isNaN(parseInt(port))
  ) {
    throw new Error("Invalid ENV db configuration");
  }

  return {
    database,
    host,
    user,
    password,
    port: parseInt(port),
  };
}

const DB_ENV = getDbEnv();

export const db = new Pool(DB_ENV);
