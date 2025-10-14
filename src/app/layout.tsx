import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";


export const metadata: Metadata = {
  icons: {

    icon:'/icon/icon.png',
    apple:'/icon/icon.png'

  },
  title: "Next Note",
  description: "App de notas feito com Next.js + TS, Otimizado para a máxima experiência do usuário",
};

const roboto = Roboto({

  display:'swap',
  weight:["300", "500", "700", "900"]

})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-theme="dark" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="data-theme" 
        defaultTheme="system"
        disableTransitionOnChange>
        <SessionProvider>
        <NavBar/>
        {children}
        </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
