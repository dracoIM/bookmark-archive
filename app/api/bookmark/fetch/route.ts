// app/api/bookmark/fetch/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { bookmarkBlogByUrl } from "@/lib/blog/fetchFromUrl";
import { headers } from "next/headers";

export async function POST(req: Request) {
  // 1. Authenticate request
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const body = await req.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // 3. Fetch & save blog + bookmark
  const result = await bookmarkBlogByUrl(userId, url); // ✅ Uses userId safely

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    title: result.title,
    description: result.description,
    markdown: result.markdown,
    siteName: result.siteName,
    faviconUrl: result.faviconUrl,
  });
}
