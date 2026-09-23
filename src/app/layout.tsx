import type { Metadata, Viewport } from "next";
import { Quicksand, Cairo } from "next/font/google";
import "./globals.css";
import { ScreenBlocker } from "@/components/ScreenBlocker";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "to my heba",
  description: "A small personal interactive cat experience.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐱</text></svg>',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFF7ED",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${cairo.variable}`}>
      <body className="min-h-screen bg-[#FFF7ED] text-[#2A160B] antialiased selection:bg-[#FED7AA] selection:text-[#C2410C]">
        <ScreenBlocker>
          {children}
        </ScreenBlocker>
      </body>
    </html>
  );
}
