import { Montserrat } from "next/font/google";
import NavBar from "./components/NavBar";
import "./globals.css";
import { QueryProvider } from "@app/providers/QueryProvider";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Full Stack Blog",
  description: "Basic tutorials about Web Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <NavBar />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
