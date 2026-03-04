import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "IQ Khan Rent A Car | Premium Car Rental Lahore",
  description: "Experience luxury and comfort with IQ Khan Rent A Car. Best car rental services in Lahore with and without driver. Daily, weekly, and monthly rates available.",
  keywords: ["rent a car lahore", "iq khan rent a car", "luxury car rental pakistan", "car hire lahore", "with driver car rental", "iq khan rentacar"],
  authors: [{ name: "IQ Khan Rent A Car" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
