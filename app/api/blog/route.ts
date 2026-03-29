import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const PROFILE_URL = process.env.CSDN_PROFILE_URL || "https://blog.csdn.net/2604_95682899?type=blog";

type BlogCard = {
  title: string;
  url: string;
  cover: string;
  views: number;
};

function parseViews(text: string) {
  const cleaned = text.replace(/[,\s]/g, "").toLowerCase();
  if (!cleaned) return 0;
  if (cleaned.includes("w")) {
    const n = parseFloat(cleaned.replace("w", ""));
    return Number.isFinite(n) ? Math.round(n * 10000) : 0;
  }
  const n = parseInt(cleaned.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function normalizeUrl(u: string) {
  if (!u) return "";
  if (u.startsWith("//")) return `https:${u}`;
  return u;
}

async function getCoverFromArticle(url: string) {
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" }, next: { revalidate: 1800 } });
    if (!res.ok) return "";
    const html = await res.text();
    const $ = cheerio.load(html);
    const og = $("meta[property='og:image']").attr("content") || "";
    return og;
  } catch {
    return "";
  }
}

export async function GET() {
  try {
    const res = await fetch(PROFILE_URL, {
      headers: { "user-agent": "Mozilla/5.0" },
      next: { revalidate: 1800 }
    });

    if (!res.ok) {
      return NextResponse.json({ profileUrl: PROFILE_URL, items: [], message: "CSDN profile unavailable" });
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const raw: BlogCard[] = [];
    const nodes = $(".article-item-box, article, .blog-list-box .list-item").toArray();

    for (const node of nodes) {
      const el = $(node);
      const linkEl = el.find("h4 a, h2 a, .article-title-link, a[href*='/article/details/']").first();
      const href = linkEl.attr("href") || "";
      const title = (linkEl.text() || "").replace(/\s+/g, " ").trim();
      if (!href || !title) continue;

      const url = href.startsWith("http") ? href : `https://blog.csdn.net${href.startsWith("/") ? "" : "/"}${href}`;
      const img =
        el.find("img").first().attr("data-src") ||
        el.find("img").first().attr("src") ||
        el.find(".article-item-img").first().attr("src") ||
        "";
      const viewText = el.find(".read-num, .view-num, .num").first().text() || "";

      raw.push({
        title,
        url,
        cover: normalizeUrl(img),
        views: parseViews(viewText)
      });
    }

    const unique = Array.from(new Map(raw.map((i) => [i.url, i])).values()).slice(0, 18);

    const withCover = await Promise.all(
      unique.map(async (item) => {
        if (item.cover) return item;
        const fallbackCover = await getCoverFromArticle(item.url);
        return { ...item, cover: fallbackCover };
      })
    );

    const sorted = withCover.sort((a, b) => b.views - a.views);

    return NextResponse.json({
      profileUrl: PROFILE_URL,
      items: sorted
    });
  } catch {
    return NextResponse.json({ profileUrl: PROFILE_URL, items: [], message: "fetch failed" });
  }
}
