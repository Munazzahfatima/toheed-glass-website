import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "New Toheed Glass & Accessories | Architectural & Decorative Glass Pakistan",
    template: "%s | New Toheed Glass & Accessories",
  },
  description:
    "New Toheed Glass & Accessories — Pakistan's trusted manufacturer and supplier of decorative glass, architectural glass, LED smart mirrors, beveled mirror walls, frosted glass, stained glass, ACP cladding, curtain walls, glass partitions and more.",
  keywords: [
    "decorative glass Pakistan",
    "architectural glass Pakistan",
    "LED smart mirror",
    "beveled mirror wall",
    "frosted glass",
    "stained glass",
    "ACP wall cladding",
    "glass curtain wall",
    "office glass partition",
    "shower cabin Pakistan",
    "glass railing Pakistan",
    "New Toheed Glass Sargodha",
  ],
  openGraph: {
    title: "New Toheed Glass & Accessories",
    description: "Architectural & Decorative Glass Solutions in Pakistan",
    images: ["/images/logo.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
