import type { Metadata } from "next";
import { inter } from "@/app/utils/font";
import "./globals.css";

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
      <body className={`${inter.className}  antialiased`}>{children}</body>
    </html>
  );
}
