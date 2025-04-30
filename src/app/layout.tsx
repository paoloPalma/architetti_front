// app/layout.tsx
'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AxiosProvider from "@/context/AxiosProvider";
import UserProvider from "@/context/UserProvider";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation"; // Importa hook per ottenere la rotta
import CourseProvider from "@/context/Course";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Ottieni il pathname della rotta corrente

  // Pagine che non devono essere avvolte dai provider (esempio: login, registrazione)
  const noProviderPages = ["/auth/login", "/auth/register"];

  // Controlla se la rotta corrente è una delle pagine senza provider
  const isNoProviderPage = noProviderPages.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <AxiosProvider>
            <UserProvider>
          {/* Avvolgi i provider solo se non siamo su una pagina "no provider" */}
          {!isNoProviderPage ? (
            <CourseProvider>
              {children}
            </CourseProvider>
          ) : (
            children
          )}
          <Toaster />
          </ UserProvider>
          </ AxiosProvider>
      </body>
    </html>
  );
}
