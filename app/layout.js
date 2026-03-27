import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono"
});

const themeBootstrapScript = `
(() => {
  const stored = window.localStorage.getItem("theme-preference");
  const mode = stored === "light" || stored === "dark" || stored === "auto" ? stored : "auto";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themeMode = mode;
  document.body.dataset.theme = resolved;
  document.body.dataset.themeMode = mode;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", resolved === "light" ? "#f4eadb" : "#09111d");
  }
})();
`;

export const metadata = {
  metadataBase: new URL("https://me.zhangjiajia.me"),
  title: "Jiajia Zhang | Systems, AI Workflows, and Internal Products",
  description:
    "Jiajia Zhang designs systems, AI workflows, and internal products that help teams operate with more clarity and less friction.",
  applicationName: "Jiajia Zhang",
  keywords: [
    "Jiajia Zhang",
    "AI workflows",
    "internal tools",
    "product systems",
    "decision support",
    "systems design"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName: "Jiajia Zhang",
    title: "Jiajia Zhang | Systems, AI Workflows, and Internal Products",
    description:
      "Systems, AI workflows, and internal products built around operational clarity.",
    url: "/",
    images: [
      {
        url: "/assets/og-card-optimized.png",
        width: 1200,
        height: 630,
        alt: "Jiajia Zhang personal website preview card"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiajia Zhang | Systems, AI Workflows, and Internal Products",
    description:
      "Systems, AI workflows, and internal products built around operational clarity.",
    images: ["/assets/og-card-optimized.png"]
  },
  icons: {
    icon: "/assets/og-card.svg"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09111d"
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
