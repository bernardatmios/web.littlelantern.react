import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { AuthProvider } from '@/contexts/AuthContext';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import Footer from '@/components/Footer';
import { BRAND_FAVICON_URL } from '@/lib/branding';
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.littlelantern.kids';

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Little Lanterns - Children's Story Books",
    template: '%s | Little Lanterns',
  },
  description: "Bilingual children's story books in English and Afrikaans",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: "Little Lanterns - Children's Story Books",
    description: "Bilingual children's story books in English and Afrikaans",
    siteName: 'Little Lanterns',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Little Lanterns - Children's Story Books",
    description: "Bilingual children's story books in English and Afrikaans",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: BRAND_FAVICON_URL,
    shortcut: BRAND_FAVICON_URL,
    apple: BRAND_FAVICON_URL,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${fredoka.variable} ${poppins.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ViewModeProvider>
              {children}
              <Footer />
            </ViewModeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
