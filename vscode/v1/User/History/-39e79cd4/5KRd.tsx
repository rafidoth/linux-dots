import type { Metadata } from "next";
import { inter } from "@/app/utils/font";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Ument",
  description: "Your Mentorship Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}  antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
