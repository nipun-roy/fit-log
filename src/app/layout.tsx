import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ToastContainer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitLog — Train With Intent. Log Every Set.",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  keywords: ["workout", "fitness", "gym", "exercise tracker", "bodybuilding", "lifts", "FitLog"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0c0d10] text-white selection:bg-[#ccff00] selection:text-black">
        <FitLogProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <ToastContainer />
        </FitLogProvider>
      </body>
    </html>
  );
}
