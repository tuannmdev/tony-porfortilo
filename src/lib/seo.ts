import { Metadata } from "next";

const siteConfig = {
  name: "Tony's Portfolio",
  title: "Tony Porfortilo - Senior Software Engineer",
  description:
    "Portfolio of Tony Porfortilo, a Senior Software Engineer specializing in full-stack development with React, Next.js, Node.js, and modern web technologies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  author: "Tony Porfortilo",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Portfolio",
    "Senior Developer",
  ],
};

export function generateSEO({
  title,
  description,
  image,
  url,
  type = "website",
  keywords,
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageImage = image
    ? `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`;
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const pageKeywords = keywords
    ? [...siteConfig.keywords, ...keywords]
    : siteConfig.keywords;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      type,
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@tony", // Update with actual Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    jobTitle: "Senior Software Engineer",
    url: siteConfig.url,
    sameAs: [
      // Add social media URLs
      "https://github.com/tony",
      "https://linkedin.com/in/tony",
    ],
    knowsAbout: [
      "Software Development",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full-Stack Development",
    ],
  };
}

export function generateProjectSchema(project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated?: string;
  technologies?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    dateCreated: project.dateCreated,
    programmingLanguage: project.technologies,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
  };
}

export { siteConfig };
