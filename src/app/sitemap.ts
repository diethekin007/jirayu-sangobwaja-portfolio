import type { MetadataRoute } from "next";

const siteUrl = "https://jirayu-sangobwaja.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${siteUrl}/assets/portfolio-1.png`,
        `${siteUrl}/assets/portfolio-2.png`,
        `${siteUrl}/assets/portfolio-3.png`,
      ],
    },
  ];
}
