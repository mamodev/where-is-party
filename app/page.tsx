import SignInButton from "@/components/SignInButton";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className={`${inter.className} mb-3 text-5xl font-semibold`}>
        Where is Party?
      </h1>
      <h1 className={`${inter.className} mb-3 text-xl font-semibold`}>
        Let us help you and tonight will be unforgettable!
      </h1>
      <SignInButton />
      <Link href={"/user"}>User page</Link>
    </main>
  );
}
