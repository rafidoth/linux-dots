import type { Metadata } from "next";
import { jakarta } from "@/app/utils/font";
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
    <html lang="en">
      <body className={`${jakarta.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
