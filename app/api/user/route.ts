import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { ApiError, ErrorType } from "../ApiError";
import { createUser } from "@/database/creators/user";
import { UniqueConstraintError } from "@/database/utils";

const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = bodySchema.parse(body);
    const { firstName, lastName, email, password } = parsedBody;

    const response = await createUser({ firstName, lastName, email, password });

    if (response.rowCount !== 1)
      throw new Error("User creation returned unexpected result.");

    return new Response(JSON.stringify(response.rows[0]), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return new ApiError(
        "Email already in use",
        ErrorType.Conflict,
        "Questa email e già in uso."
      ).getResponse();
    }
    if (err instanceof ZodError || err instanceof SyntaxError)
      return new ApiError("Invalid body", ErrorType.BadRequest).getResponse();
    return new ApiError("Internal error", ErrorType.Internal).getResponse();
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new ApiError(
      "You must be logged in!",
      ErrorType.Unauthorized
    ).getResponse();
  }

  return new Response(JSON.stringify(token));
}
