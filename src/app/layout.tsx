import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jirayu-sangobwaja.vercel.app"),
  title: "Jirayu Sangobwaja | Front-End Developer & UI/UX Designer",
  description: "Computer Science student passionate about front-end development and crafting intuitive user experiences. View my projects and resume.",
  keywords: ["Jirayu Sangobwaja", "Front-End Developer", "UI/UX Designer", "Portfolio", "React", "Next.js", "Web Development"],
  authors: [{ name: "Jirayu Sangobwaja" }],
  creator: "Jirayu Sangobwaja",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jirayu Sangobwaja | Front-End Developer",
    description: "I build functional, well-designed web applications and love solving problems. Welcome to my creative portfolio.",
    url: "/",
    siteName: "Jirayu Sangobwaja Portfolio",
    images: [
      {
        url: "/assets/hero_portrait_v2.png", // Using your existing hero image as a fallback
        width: 800,
        height: 1000,
        alt: "Jirayu Sangobwaja Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jirayu Sangobwaja | Front-End Developer",
    description: "Portfolio, projects, skills, and experience of Jirayu Sangobwaja.",
    images: ["/assets/portfolio-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space.variable} ${mono.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
