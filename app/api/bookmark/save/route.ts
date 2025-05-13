// app/api/bookmark/save/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  // 1. Authenticate
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse & validate
  const { url, title, platform, category, description } = await req.json();
  if (!url || !title || !platform) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 3. Prevent duplicates
  const exists = await prisma.bookmark.findUnique({ where: { slug: url } });
  if (exists) {
    return NextResponse.json(
      { error: "Bookmark already exists" },
      { status: 409 }
    );
  }

  // 4. Create bookmark
  const bookmark = await prisma.bookmark.create({
    data: {
      userId: session.user.id,
      url,
      title,
      description,
      siteName: new URL(url).hostname,
      faviconUrl: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`,
      slug: encodeURIComponent(url),
      // other optional fields: folderId, tags, blogPostId, etc.
    },
  });

  return NextResponse.json(bookmark);
}
