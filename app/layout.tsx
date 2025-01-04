import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ModalProvider from "@/components/modals/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Descubra Que Tipo de Homem Você É | Quizz Divertido",
  description:
    "Você é o 'Enforca Errado', 'Erra Buraco', 'Bate Fraco', 'Goza e Dorme', 'Empurra Mole' ou 'Geme Fino'? Responda nosso quizz divertido e descubra!",
  keywords:
    "quizz, tipo de homem, enforca errado, erra buraco, bate fraco, goza e dorme, empurra mole, geme fino",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    url: "https://tipodehomem.vercel.app/",
    title: "Descubra Que Tipo de Homem Você É | Quizz Divertido",
    description:
      "Você é o 'Enforca Errado', 'Erra Buraco', 'Bate Fraco', 'Goza e Dorme', 'Empurra Mole' ou 'Geme Fino'? Responda nosso quizz divertido e descubra!",
    images: [
      {
        url:
          "https://opengraph.b-cdn.net/production/images/943771ce-23fd-4d64-85d3-9c9d0719c0e2.jpg?token=OH3OJR5FY2KgBaVnwdUJj219POia0wOc6LvZROUMp0g&height=650&width=1200&expires=33271995893",
        width: 1200,
        height: 650,
        alt: "Imagem do Quizz Tipo de Homem",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tipodehomem",
    title: "Descubra Que Tipo de Homem Você É | Quizz Divertido",
    description:
      "Você é o 'Enforca Errado', 'Erra Buraco', 'Bate Fraco', 'Goza e Dorme', 'Empurra Mole' ou 'Geme Fino'? Responda nosso quizz divertido e descubra!",
    images: [
      "https://opengraph.b-cdn.net/production/images/943771ce-23fd-4d64-85d3-9c9d0719c0e2.jpg?token=OH3OJR5FY2KgBaVnwdUJj219POia0wOc6LvZROUMp0g&height=650&width=1200&expires=33271995893",
    ],
  },
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
