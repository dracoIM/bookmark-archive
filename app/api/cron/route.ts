import { fetchTwitterBookmarks } from "@/lib/social/fetchTwitter";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Fetch Twitter Bookmarks
    const users = await prisma.user.findMany({
      where: {
        api_keys: {
          some: {
            provider: "twitter",
          },
        },
      },
      include: {
        api_keys: {
          where: {
            provider: "twitter",
          },
        },
      },
    });

    for (const user of users) {
      await fetchTwitterBookmarks(user.id);
    }

    return new Response("Cron job executed successfully!");
  } catch (error) {
    console.error("Cron job failed:", error);
    return new Response("Cron job failed!", { status: 500 });
  }
}
