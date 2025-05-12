// app/api/bookmark/save/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  // 1. Authenticate
  const session = await auth.api.getSession({
     headers: await headers(), // you need to pass the headers object.
   });
   where{
   const userId = session?.user.id  
   });
 
   if (!session || session.user.id !== bookmark?.userId) {
     return redirect("/auth/magic-link");
   }

  // 2. Parse & validate
  const { url, title, platform, category, description } = await req.json()
  if (!url || !title || !platform) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // 3. Prevent duplicates
  const exists = await prisma.bookmark.findUnique({ where: { slug: url } })
  if (exists) {
    return NextResponse.json({ error: 'Bookmark already exists' }, { status: 409 })
  }

  // 4. Create bookmark
  const bookmark = await prisma.bookmark.create({
    data: {
      
      url,
      title,
      description,
      platform,
      category,
      faviconUrl: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`,
      slug: encodeURIComponent(url),
      // other optional fields: folderId, tags, blogPostId, etc.
    }
  })

  return NextResponse.json(bookmark)
}
