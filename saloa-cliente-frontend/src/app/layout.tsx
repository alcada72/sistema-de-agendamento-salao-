import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "J.M.C - CACHIUNGO",
  description: "Cyber, comércio e prestações de serviços, sistema de agendamento de serviços.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
