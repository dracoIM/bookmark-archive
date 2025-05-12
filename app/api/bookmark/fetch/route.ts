import { NextResponse } from "next/server";
import { bookmarkBlogByUrl } from '@/lib/blog/fetchFromUrl'
async function fetchFromUrl(url: string): Promise<blogPost> {
  const article = await blogPost(url, userId);  
  return article;
}

 const { url } = await req.json()
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  // 3. Fetch & save blog + bookmark
  const result = await bookmarkBlogByUrl(userId, url)
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }
  return NextResponse.json({
    title: result.title,
    markdown: result.markdown,
    siteName: result.siteName,
    favicon: result.favicon,
  })
} 