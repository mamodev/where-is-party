import { Inter } from "next/font/google";
import EventForm from "./EventForm";

const inter = Inter({ subsets: ["latin"] });

export default function OrganizationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <EventForm />
      </div>
    </main>
  );
}
