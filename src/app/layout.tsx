import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ThemeProvider } from "./providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stef Co.",
  description: "Created by Stef",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`${inter.className} flex flex-row`}>
          <Sidebar />
          <div className="bg-red-500 w-11/12">
            <Header />
            {children}
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
