import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Where is party",
  description: "Find a party and enjoi your night",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
