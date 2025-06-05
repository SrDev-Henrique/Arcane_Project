import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LenisProvider } from "@/contexts/LenisContext";
import { MenuProvider } from "@/contexts/GlobalContext";
import { ViewTransitions } from "next-view-transitions";

import ClientSideScrollRestorer from "@/utils/ClientSideScrollRestorer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcane",
  description: "Desenvolvido por SrDev-Henrique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ViewTransitions>
      <html lang="pt-br">
        <head>
          <link
            rel="preload"
            href="/fonts/zentry-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClientSideScrollRestorer />
          <MenuProvider>
            <LenisProvider>{children}</LenisProvider>
          </MenuProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
