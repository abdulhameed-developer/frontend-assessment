// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import { ContactProvider } from "@/context/ContactContext";;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BOXpad | Next.js Chat Dashboard Demo",
  description: "Explore BOXpad, a responsive chat dashboard demo by Abdul Hameed with messaging, contacts, and user settings.",
  openGraph: {
    title: "BOXpad | Next.js Chat Dashboard Demo",
    description: "A responsive chat dashboard demo by Abdul Hameed.",
    url: "https://my-frontend-assessment.vercel.app/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full overflow-hidden m-0 p-0 antialiased`}
      >
        <AuthProvider>
          <ChatProvider>
            <ContactProvider>{children}</ContactProvider>
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
