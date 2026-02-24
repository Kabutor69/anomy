import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://anomy-teal.vercel.app";
    const lastModified = new Date();

    return [
        {
            url: baseUrl,
            lastModified: lastModified,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/read`,
            lastModified: lastModified,
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/write`,
            lastModified: lastModified,
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];
}
