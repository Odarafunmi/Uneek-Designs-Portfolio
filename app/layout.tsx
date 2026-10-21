import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider, themeScript } from "@/components/providers/theme";
import { BookingProvider } from "@/components/providers/booking";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Doodles } from "@/components/doodles";
import { Cursor } from "@/components/ui/cursor";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://uneekdesigns.com"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "brand identity",
    "product design",
    "social media design",
    "Lagos designer",
    "Nigerian graphic designer",
    "packaging design",
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/brand/og.png"],
  },
  icons: {
    icon: [{ url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/brand/apple-icon.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-dvh bg-bg text-ink antialiased">
        <ThemeProvider>
          <BookingProvider>
            <SmoothScroll />
            <Cursor />
            <Nav />
            <Doodles />
            <main id="main" className="relative z-10">
              {children}
            </main>
            <Footer />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
