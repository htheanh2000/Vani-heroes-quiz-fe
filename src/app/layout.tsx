import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VaniHeros App",
  description: "VaniHeros App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
        </body>
    </html>
  );
}
