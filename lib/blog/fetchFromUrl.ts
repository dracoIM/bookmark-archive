import { extract } from "@extractus/article-extractor";
import TurndownService from "turndown";
import { prisma } from "../prisma";

const turndown = new TurndownService();

export async function bookmarkBlogByUrl(userId: string, url: string) {
  try {
    const article = await extract(url);
    if (!article) throw new Error("Unable to extract article");

    const markdown = article.content ? turndown.turndown(article.content) : "";

    const blogSource = await prisma.blogSource.upsert({
      where: { url },
      update: {},
      create: {
        url,
        title: article.source ?? article.title ?? "Unknown Source",
      },
    });

    const blogPost = await prisma.blogPost.upsert({
      where: { url },
      update: {},
      create: {
        blogId: blogSource.id,
        user_id: userId,
        url,
        title: article.title ?? "Untitled",
        summary: article.description ?? "",
        content: markdown,
        publishedAt: article.published ? new Date(article.published) : null,
      },
    });

    await prisma.bookmark.create({
      data: {
        userId,
        url,
        title: article.title ?? "Untitled",
        description: article.description ?? "",
        content: markdown,
        faviconUrl: article.image ?? "",
        siteName: blogSource.title,
        slug: blogPost.id,
        blogPostId: blogPost.id,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Blog fetch error:", error.message);
    await prisma.fetchLog.create({
      data: { userId, platform: "blog", status: "error", error: error.message },
    });
    return { error: "Failed to extract blog content" };
  }
}
