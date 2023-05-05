import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/dist/client/components/headers";
import { sessionFetch } from "../api/auth/sessionFetch";

async function getData() {
  const res = await sessionFetch("http://localhost:3000/api/user", {
    cache: "no-store",
  });

  if (!res.ok) {
    // throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function UserPage() {
  const data = await getData();

  return <div>User</div>;
}
