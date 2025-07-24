import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/utils/font";
import Providers from "@/app/utils/Providers";

export const metadata: Metadata = {
  title: "jigao",
  description: "A AI Powered Quiz Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} transition-colors duration-500 ease-in-out  antialiased  `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
