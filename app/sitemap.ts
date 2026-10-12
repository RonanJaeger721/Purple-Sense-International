import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/catalogue";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/products",
    "/services",
    "/industries",
    "/request-quote",
    "/contact",
    "/privacy",
    ...categories.map((c) => `/products/category/${c.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/products/") ? 0.7 : 0.8,
  }));
}
