import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AuthProvider from "@/components/AuthProvider";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title:
    "Flux Kontext Smart Image Editor - AI Conversational Image Editing Tool",
  description:
    "Upload images, engage in smart conversations with the Flux Kontext Pro AI model to precisely edit images according to your needs, and get new images ready for commercial use. Your creativity, powered by AI.",
  keywords:
    "AI image editing, Flux Kontext Pro, AI image modification, conversational image editing, online image editor, smart photo editing, commercial-use images, AI image processing",
  alternates: {
    canonical: "https://fluxkontext.tech/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <UserProvider>
            {children}
            {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
