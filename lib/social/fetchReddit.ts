import axios from "axios";
import { prisma } from "../prisma";

export async function fetchRedditBookmarks(userId: string) {
  try {
    const account = await prisma.apiKey.findFirst({
      where: { userId, provider: "reddit" },
    });

    if (!account?.accessToken) throw new Error("Missing Reddit access token");

    const response = await axios.get(
      "https://oauth.reddit.com/api/v1/me/saved",
      {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
          "User-Agent": "Bookmark Archive Bot", // Reddit requires a user agent
        },
      }
    );

    const bookmarks = response.data.data.children.map((item: any) => {
      const post = item.data;
      return {
        title: post.title.slice(0, 100),
        url: `https://www.reddit.com${post.permalink}`,
        faviconUrl: "https://www.reddit.com/favicon.ico",
        userId,
        slug: post.id,
        createdAt: new Date(post.created_utc * 1000), // Convert to milliseconds
        updatedAt: new Date(post.created_utc * 1000),
      };
    });

    await prisma.bookmark.createMany({
      data: bookmarks,
    });
  } catch (error) {
    console.error(error);
  }
}
