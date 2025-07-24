import React from "react";

type Props = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}  antialiased flex justify-center`}>
        {children}
      </body>
    </html>
  );
}
