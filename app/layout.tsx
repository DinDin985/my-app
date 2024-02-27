import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-primary pb-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-thumb-rounded-lg 2xl:pb-0">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
