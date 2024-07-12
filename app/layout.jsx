import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "../components/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "You Book",
  description: "Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <ToasterProvider/>{children}
    </body>
  </html>
  );
}
