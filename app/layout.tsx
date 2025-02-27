import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"

import "./globals.css";
import AgeConsentDialog from "@/components/entry-modal";
import { FilterProvider } from "./providers/use-filters";
import { CategoryProvider } from "./providers/use-categories";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatababe",
  description: "Chatababe is a live streaming platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signUpForceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
    >
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/icons/favicon.jpg"
          />
        </head>
        <body className={inter.className}>
          <Toaster
            invert
            richColors
            closeButton
            containerAriaLabel="Toaster"
            position="bottom-center"
          />
          <Analytics />
          <AgeConsentDialog />
          <Suspense fallback={<Loading/>}>
            <CategoryProvider>
              <FilterProvider>{children}</FilterProvider>
            </CategoryProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
