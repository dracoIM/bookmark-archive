"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ExternalLink,
  Bookmark,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";
import { CommentThread } from "@/components/comment-thread";
import { BookmarkCard } from "@/components/bookmark-card";
import { ReadingMode } from "@/components/reading-mode";
import Link from "next/link";

interface BookmarkDetailViewProps {
  bookmark: any;
}

export function BookmarkDetailView({ bookmark }: BookmarkDetailViewProps) {
  const [isFavorite, setIsFavorite] = useState(bookmark.isFavorite);
  const [readingMode, setReadingMode] = useState(false);

  // Function to render the source icon based on the source type
  const renderSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case "twitter":
        return (
          <svg
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            className="h-5 w-5 text-pink-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        );
      case "youtube":
        return (
          <svg
            className="h-5 w-5 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg
            className="h-5 w-5 text-blue-700"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      default:
        return (
          <svg
            className="h-5 w-5 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
    }
  };

  // If reading mode is active, render the content in reading mode
  if (readingMode && bookmark.content) {
    return (
      <ReadingMode title={bookmark.title} onClose={() => setReadingMode(false)}>
        <h1 className="text-3xl font-bold mb-6">{bookmark.title}</h1>
        <p className="text-lg mb-8 opacity-80">{bookmark.description}</p>

        {bookmark.image && (
          <div className="mb-8">
            <img
              src={bookmark.image || "/placeholder.svg"}
              alt={bookmark.title}
              className="w-full rounded-lg object-cover max-h-[500px]"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: bookmark.content }}
        />
      </ReadingMode>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {renderSourceIcon(bookmark.sourceType)}
              <span className="text-sm font-medium">{bookmark.source}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {bookmark.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`${bookmark.categoryColor.replace("bg-", "border-")} px-2 py-0.5`}
              >
                {bookmark.category}
              </Badge>
              {/* <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                <span className="sr-only">Favorite</span>
              </Button> */}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Save</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open original</span>
                </a>
              </Button>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">{bookmark.title}</h1>
          <p className="text-muted-foreground mb-6">{bookmark.description}</p>

          {bookmark.image && (
            <div className="mb-6">
              <img
                src={bookmark.image || "/placeholder.svg"}
                alt={bookmark.title}
                className="w-full rounded-lg object-cover max-h-[400px]"
              />
            </div>
          )}

          {bookmark.content && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Content Preview</h2>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setReadingMode(true)}
                >
                  <BookOpen className="h-4 w-4" />
                  Open in Reading Mode
                </Button>
              </div>
              <div
                className="prose prose-sm max-w-none dark:prose-invert line-clamp-6 mb-4"
                dangerouslySetInnerHTML={{ __html: bookmark.content }}
              />
              {bookmark.content.length > 300 && (
                <Button
                  variant="ghost"
                  className="text-primary"
                  onClick={() => setReadingMode(true)}
                >
                  Read full article
                </Button>
              )}
            </>
          )}

          {bookmark.hasThread && bookmark.threadData && (
            <div className="mt-8 pt-6 border-t">
              <CommentThread comments={bookmark.threadData.comments} />
            </div>
          )}
        </CardContent>
      </Card>

      {bookmark.relatedBookmarks && bookmark.relatedBookmarks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Related Bookmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmark.relatedBookmarks.map((relatedId: string) => {
              // This would normally fetch from an API or database
              const relatedBookmarks = {
                "future-web-dev": {
                  title: "The Future of Web Development",
                  description:
                    "An insightful article about the trends shaping web development in 2023 and beyond.",
                  source: "medium.com",
                  sourceIcon: (
                    <svg
                      className="h-4 w-4 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  date: "2 days ago",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Technology",
                  categoryColor: "bg-red-500",
                  isFavorite: true,
                },
                "ui-design-principles": {
                  title: "10 UI Design Principles Every Designer Should Know",
                  description:
                    "A comprehensive guide to the fundamental principles of effective user interface design.",
                  source: "twitter.com",
                  sourceIcon: (
                    <svg
                      className="h-4 w-4 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  ),
                  date: "1 week ago",
                  category: "Design",
                  categoryColor: "bg-blue-500",
                  isFavorite: false,
                  hasThread: true,
                  commentCount: 3,
                },
                "saas-30-days": {
                  title: "How I Built a SaaS Product in 30 Days",
                  description:
                    "A developer shares their journey of building and launching a SaaS product in just one month.",
                  source: "dev.to",
                  sourceIcon: (
                    <svg
                      className="h-4 w-4 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  date: "3 weeks ago",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Productivity",
                  categoryColor: "bg-green-500",
                  isFavorite: true,
                },
                "color-psychology": {
                  title: "The Psychology of Color in Marketing",
                  description:
                    "Learn how different colors affect consumer behavior and how to use this knowledge in your marketing.",
                  source: "instagram.com",
                  sourceIcon: (
                    <svg
                      className="h-4 w-4 text-pink-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  ),
                  date: "1 month ago",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Design",
                  categoryColor: "bg-blue-500",
                  isFavorite: false,
                },
                "productivity-tips": {
                  title:
                    "The Art of Productivity: How to Get More Done in Less Time",
                  description:
                    "Practical tips and strategies for maximizing your productivity and achieving your goals.",
                  source: "linkedin.com",
                  sourceIcon: (
                    <svg
                      className="h-4 w-4 text-blue-700"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  date: "3 months ago",
                  category: "Productivity",
                  categoryColor: "bg-green-500",
                  isFavorite: true,
                },
              };

              const related =
                relatedBookmarks[relatedId as keyof typeof relatedBookmarks];

              if (!related) return null;

              return (
                <Link href={`/bookmark/${relatedId}`} key={relatedId}>
                  {/* <BookmarkCard
                    title={related.title}
                    description={related.description}
                    source={related.source}
                    sourceIcon={related.sourceIcon}
                    date={related.date}
                    image={related.image}
                    category={related.category}
                    categoryColor={related.categoryColor}
                    isFavorite={related.isFavorite}
                    hasThread={related.hasThread}
                    commentCount={related.commentCount}
                  /> */}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Saved on May 2, 2023</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last viewed 2 hours ago</span>
        </div>
      </div>
    </div>
  );
}
