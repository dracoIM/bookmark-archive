import { extract } from "@extractus/article-extractor";
import { prisma } from "../prisma";

export async function bookmarkBlogByUrl(userId: string, url: string) {
  try {
    const article = await extract(url);
    if (!article) throw new Error("Unable to extract article");

    const blogSource = await prisma.blogSource.upsert({
      where: { url },
      update: {},
      create: {
        url,
        title:
          article.siteName ||
          article.source ||
          article.title ||
          "Unknown Source",
      },
    });

    const blogPost = await prisma.blogPost.upsert({
      where: { url },
      update: {},
      create: {
        blogId: blogSource.id,
        user_id: userId,
        url,
        title: article.title || "Untitled",
        summary: article.description || article.excerpt || "",
        publishedAt: article.published ? new Date(article.published) : null,
      },
    });

    await prisma.bookmark.create({
      data: {
        userId,
        url,
        title: article.title || "Untitled",
        description: article.description || article.excerpt || "",
        faviconUrl: article.image || "",
        siteName: article.siteName || blogSource.title,
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
