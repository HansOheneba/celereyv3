import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

// =========================
// Fonts
// =========================

// PP Cirka
const ppCirka = localFont({
  src: [
    {
      path: "./fonts/ppcirka/PPCirka-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/ppcirka/PPCirka-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ppcirka/PPCirka-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ppcirka/PPCirka-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-pp-cirka",
});

// Helvetica
const helvetica = localFont({
  src: [
    {
      path: "./fonts/helvetica/HelveticaNeueThin.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueLight.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueRoman.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueMedium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },

    // Italics
    {
      path: "./fonts/helvetica/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueMediumItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-helvetica",
});

// =========================
// SEO Metadata
// =========================

export const metadata: Metadata = {
  title: "Celerey | Personalized Wealth Planning For Everyone",
  description:
    "Celerey is an advanced wealth planning platform that helps you grow, protect, and optimize your assets through personalized strategies, tax-aware guidance, and secure, intuitive tools.",
  keywords: [
    "wealth planning",
    "financial planning",
    "investment platform",
    "personal finance",
    "asset management",
  ],
  openGraph: {
    title: "Celerey",
    description: "Personalized wealth planning platform",
    url: "https://yourdomain.com",
    siteName: "Celerey",
    images: [
      {
        url: "/logos/logoDark.png",
        width: 1200,
        height: 630,
        alt: "Celerey",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// =========================
// Root Layout
// =========================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ppCirka.variable} ${helvetica.variable} antialiased`}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="mx-auto pt-18">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications */}
        <Toaster position="bottom-center" />

        {/* Chatbase Script */}
        <Script id="chatbase-loader" strategy="afterInteractive">
          {`
            (function(){
              if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                window.chatbase = (...arguments) => {
                  if(!window.chatbase.q){window.chatbase.q=[]}
                  window.chatbase.q.push(arguments)
                };
                window.chatbase = new Proxy(window.chatbase, {
                  get(target, prop){
                    if(prop === "q"){ return target.q }
                    return (...args) => target(prop, ...args)
                  }
                });
              }
              const onLoad = function(){
                const script = document.createElement("script");
                script.src = "https://www.chatbase.co/embed.min.js";
                script.id = "HNRO7HdMQTKn9OIQUfoam";
                script.domain = "www.chatbase.co";
                document.body.appendChild(script);
              };
              if(document.readyState === "complete"){ onLoad() }
              else { window.addEventListener("load", onLoad) }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
