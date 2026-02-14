import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Crafter Tapes | Industrial Tapes & Packaging Materials",
  description:
    "Leading manufacturer of industrial tapes, packaging materials, and custom adhesive solutions. Serving B2B clients with high-quality products for manufacturing, logistics, and distribution.",
  keywords:
    "industrial tapes, packaging materials, adhesive tapes, B2B manufacturing, protective films, custom tape solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark flex flex-col font-sans">
        <ConvexClientProvider>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
