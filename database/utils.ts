import { Pool, QueryResult } from "pg";
import { v4 } from "uuid";

export function uuid() {
  return v4();
}

export class UniqueConstraintError extends Error {
  constraint: string;

  constructor(message: string, constraint: string) {
    super(message);
    this.name = "UniqueConstraintError";
    this.constraint = constraint;
  }
}

export async function query(db: Pool, query: string, values?: any[]) {
  try {
    return await db.query(query, values);
  } catch (err) {
    if (err instanceof Error) {
      if ((err as any).code === "23505") {
        throw new UniqueConstraintError(
          (err as any).details as string,
          (err as any).constraint as string
        );
      }
      throw err;
    }

    throw new Error("Unknown db errr");
  }
}
