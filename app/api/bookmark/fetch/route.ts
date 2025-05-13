import { NextResponse } from "next/server";
import { extract } from "@extractus/article-extractor";
import TurndownService from "turndown";

const turndown = new TurndownService();

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const article = await extract(url);
    if (!article) {
      return NextResponse.json(
        { error: "Unable to extract article" },
        { status: 500 }
      );
    }

    const markdown = article.content ? turndown.turndown(article.content) : "";

    return NextResponse.json({
      title: article.title ?? "",
      description: article.description ?? "",
      markdown,
      siteName: article.source ?? new URL(url).hostname,
      faviconUrl: article.favicon ?? "", // fallback to article.favicon
      image: article.image ?? "",
    });
  } catch (error: any) {
    console.error("Fetch metadata error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}
