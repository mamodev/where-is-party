import { ZodError, ZodIssue, ZodSchema } from "zod";
import { ApiError } from "./ApiError";

function getMessageFromIssue(issue: ZodIssue) {
  const path = issue.path.length > 0 ? `[${issue.path.join(", ")}]` : "";
  return `${path} ${issue.message}`;
}

export async function serializeJson<T extends ZodSchema>(
  schema: T,
  request: Request
) {
  let unsafeData;

  try {
    unsafeData = await request.json();
  } catch {
    return new ApiError("Invalid json format");
  }

  try {
    return schema.parse(unsafeData) as T;
  } catch (error) {
    if (error instanceof ZodError)
      throw new Error(error.issues.map(getMessageFromIssue).join(", "));

    return new ApiError("Json body params don't match the endpoint specific");
  }
}
