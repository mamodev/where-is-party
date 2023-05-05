import { NextResponse } from "next/server";
import { db } from "../../db";

type RouteParams = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, { params }: RouteParams) {
  const { slug } = params;
  const client = await db.connect();

  return NextResponse.json({ slug });
}
