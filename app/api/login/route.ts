import { ZodError, z } from "zod";
import { ApiError, ErrorType } from "../ApiError";
import { query } from "@/database/utils";
import { db } from "@/database/db";
import bcrypt from "bcrypt";

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = bodySchema.parse(body);
    const { email, password } = parsedBody;

    const response = await query(
      db,
      "SELECT * FROM core.user WHERE email = $1",
      [email]
    );

    if (response.rowCount !== 1) {
      return new ApiError(
        "Invalid user email or password",
        ErrorType.NotFound,
        "Email o password invalidi"
      ).getResponse();
    }

    const { password_hash, ...user } = response.rows[0];
    const passwordHashBuffer: Buffer = password_hash;

    //Convert passwordHashBuffer to string
    const passwordHash = passwordHashBuffer.toString("utf-8");

    //Check if password is correct with bcrypt
    if (!(await bcrypt.compare(password, passwordHash))) {
      return new ApiError(
        "Invalid user email or password",
        ErrorType.BadRequest,
        "Email o password invalidi"
      ).getResponse();
    }

    return new Response(JSON.stringify(user), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    if (err instanceof ZodError || err instanceof SyntaxError)
      return new ApiError("Invalid body", ErrorType.BadRequest).getResponse();
    console.log(err);
    return new ApiError("Internal error", ErrorType.Internal).getResponse();
  }
}
