import { NextResponse } from "next/server";
import { db } from "../../db";
import { ApiError, ErrorType } from "../../ApiError";

type RouteParams = {
  params: { oname: string };
};

export async function GET(_req: Request, props: RouteParams) {
  try {
    const organization = await db.query(
      "SELECT * from core.organization as o WHERE o.name = $1",
      [props.params.oname]
    );

    if (organization.rowCount < 1)
      return new ApiError(
        "Resource not found",
        ErrorType.NotFound
      ).getResponse();

    return NextResponse.json(organization.rows[0]);
  } catch (err) {
    console.log(err);
    return new ApiError("Internal server error", ErrorType.Internal);
  }
}
