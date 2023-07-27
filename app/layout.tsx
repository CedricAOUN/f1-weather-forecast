import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const f1Font = localFont({
  src: "../public/fonts/Formula1-Regular_web_0.ttf",
  variable: "--font-f1",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "F1 - Weather Forecast",
  description: "Is it going to rain at the next GP?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${f1Font.variable} font-sans bg-gradient-to-b from-neutral-900 to-neutral-500 text-neutral-900 tracking-normal`}
      >
        {children}
      </body>
    </html>
  );
}
