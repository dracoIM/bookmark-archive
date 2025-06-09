import axios from 'axios';
import { prisma } from '../prisma';

export async function fetchYouTubeBookmarks(userId: string) {
  try {
    const account = await prisma.apiKey.findFirst({
      where: { userId, provider: 'youtube' }
    });

    if (!account?.accessToken) throw new Error('Missing YouTube access token');

    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        myRating: 'like',
        part: 'snippet',
        maxResults: 50
      },
      headers: {
        Authorization: `Bearer ${account.accessToken}`
      }
    });

    const bookmarks = response.data.items.map((video: any) => ({
      title: video.snippet.title,
      url: `https://youtube.com/watch?v=${video.id}`,
      faviconUrl: 'https://www.youtube.com/s/desktop/f6dcf9e6/img/favicon.ico',
      userId,
      slug: video.id,
      createdAt: new Date(video.snippet.publishedAt),
      updatedAt: new Date()
    }));

    await prisma.bookmark.createMany({ data: bookmarks, skipDuplicates: true });
    return bookmarks;
  } catch (error: any) {
    console.error('YouTube fetch failed:', error);
    await prisma.fetchLog.create({ data: { userId, platform: 'youtube', status: 'error', error: error.message } });
    return [];
  }
}

