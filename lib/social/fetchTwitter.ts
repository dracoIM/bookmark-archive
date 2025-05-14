import axios from "axios";
import { prisma } from "../prisma";

export async function fetchTwitterBookmarks(userId: string) {
  try {
    const account = await prisma.apiKey.findFirst({
      where: { userId, provider: "twitter" },
    });

    if (!account?.accessToken) throw new Error("Missing Twitter access token");

    const response = await axios.get(
      "https://api.twitter.com/2/users/me/bookmarks",
      {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        },
      }
    );

    const bookmarks = response.data.data.map((tweet: any) => ({
      title: tweet.text.slice(0, 100),
      url: `https://twitter.com/i/web/status/${tweet.id}`,
      faviconUrl: "https://twitter.com/favicon.ico",
      userId,
      slug: tweet.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await prisma.bookmark.createMany({
      data: bookmarks,
    });
  } catch (error) {
    console.error(error);
  }
}
