import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ModalProvider from "@/components/modals/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Descubra Que Tipo de Homem Você É | Quizz Divertido",
  description: "Você é o 'Enforca Errado', 'Erra Buraco', 'Bate Fraco', 'Goza e Dorme', 'Empurra Mole' ou 'Geme Fino'? Responda nosso quizz divertido e descubra!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ModalProvider />
        <main>{children}</main>
        <Toaster position="top-center" duration={5000} richColors />
      </body>
      <GoogleAnalytics gaId="G-FBNF4TXG2F" />
    </html>
  );
}
