import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lasya Sri Yerramsetti — AI Builder & CS Engineer",
  description:
    "Portfolio of Lasya Sri Yerramsetti — CS sophomore at BVRIT Hyderabad building AI agents, ML pipelines, and full-stack systems. HacKOn with Amazon 6.0 Student Builder Challenge winner.",
  keywords: [
    "Lasya Sri Yerramsetti",
    "AI developer",
    "machine learning",
    "multi-agent systems",
    "BVRIT",
    "portfolio",
  ],
  authors: [{ name: "Lasya Sri Yerramsetti" }],
  openGraph: {
    title: "Lasya Sri Yerramsetti — AI Builder & CS Engineer",
    description:
      "Building AI agents, ML pipelines, and full-stack systems. HacKOn with Amazon 6.0 Student Builder Challenge winner.",
    url: "https://lasyasri.dev",
    type: "website",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/184822553?v=4",
        width: 400,
        height: 400,
        alt: "Lasya Sri Yerramsetti",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Lasya Sri Yerramsetti — AI Builder",
    description: "Building AI agents, ML pipelines, and full-stack systems.",
    images: ["https://avatars.githubusercontent.com/u/184822553?v=4"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
