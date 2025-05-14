// app/api/bookmark/save/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { newBookMarkSchema } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const data = await req.json();
  const validated = newBookMarkSchema.safeParse(data);

  if (!validated.success) {
    return NextResponse.json(validated.error.issues, {
      status: 400,
    });
  }

  const { url, title, description, faviconUrl, siteName, imageUrl, markdown } =
    validated.data;
  // 1. Authenticate
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      faviconUrl:
        faviconUrl ||
        `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`,
      slug:
        encodeURIComponent(url) +
        Date.now() +
        (Math.random() * 1000).toFixed(0),
      imageUrl,
      content: markdown,

      // other optional fields: folderId, tags, blogPostId, etc.
    },
  });
  revalidatePath("/dashboard");

  return NextResponse.json(bookmark);
}
