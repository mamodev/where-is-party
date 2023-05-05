"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function SignInButton() {
  const session = useSession();

  if (session.status === "authenticated")
    return <button onClick={() => signOut()}>Esci</button>;

  return <button onClick={() => signIn()}>Accedi</button>;
}
