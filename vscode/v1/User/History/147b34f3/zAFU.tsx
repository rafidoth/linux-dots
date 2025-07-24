import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/utils/font";
import Providers from "@/app/utils/Providers";

export const metadata: Metadata = {
  title: "Kiii",
  description: "A AI powered test generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
