// app/api/bookmark/fetch/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { bookmarkBlogByUrl } from "@/lib/blog/fetchFromUrl";

export async function POST(req: Request) {
  // 1. Authenticate request
  const session = await auth.validateRequest(req, { sessionCookie: true });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  // 2. Parse body
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // 3. Fetch & save blog + bookmark
  const result = await bookmarkBlogByUrl(userId, url);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  // 4. Return the extracted data to populate the form
  return NextResponse.json({
    title: result.title,
    description: result.description,
    markdown: result.markdown, // if you returned markdown
    siteName: result.siteName,
    faviconUrl: result.faviconUrl,
  });
}
