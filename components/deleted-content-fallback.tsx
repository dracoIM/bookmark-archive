"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Archive, ExternalLink, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { BookmarkCard } from "@/components/bookmark-card"

interface DeletedContentFallbackProps {
  bookmark: any
}

export function DeletedContentFallback({ bookmark }: DeletedContentFallbackProps) {
  const [showingCached, setShowingCached] = useState(false)

  return (
    <div className="space-y-8">
      <Card className="border-yellow-200/50 bg-yellow-50/50 dark:bg-yellow-950/10 dark:border-yellow-900/20">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Content No Longer Available</h2>
              <p className="text-muted-foreground max-w-md">
                This content has been removed from its original source and is no longer available. It was last
                accessible {bookmark.lastAvailable}.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button variant="outline" className="gap-2" onClick={() => setShowingCached(!showingCached)}>
                <Archive className="h-4 w-4" />
                {showingCached ? "Hide Cached Version" : "View Cached Version"}
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Try Original Link
                </a>
              </Button>
              <Button variant="outline" className="gap-2">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <polyline points="23 20 23 14 17 14" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
                Check Web Archive
              </Button>
            </div>
          </div>

          {showingCached && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${bookmark.categoryColor.replace("bg-", "border-")} px-2 py-0.5`}
                  >
                    {bookmark.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{bookmark.date}</span>
                </div>
              </div>

              <h1 className="text-xl font-bold mb-2">{bookmark.title}</h1>
              <p className="text-muted-foreground mb-4">{bookmark.description}</p>

              <div className="p-4 border border-card-border rounded-md bg-muted/50">
                <p className="text-sm text-muted-foreground italic">
                  This is a cached version of the content saved when you bookmarked it. The original content has since
                  been removed or made private by its creator.
                </p>
              </div>

              {bookmark.image && (
                <div className="mt-4 opacity-70">
                  <img
                    src={bookmark.image || "/placeholder.svg"}
                    alt={bookmark.title}
                    className="w-full rounded-lg object-cover max-h-[300px] filter grayscale"
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-center">
                    Cached image from {bookmark.lastAvailable}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-yellow-100/50 dark:bg-yellow-900/10 px-6 py-3 flex justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Saved on May 2, 2023</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Content removed {bookmark.lastAvailable}</span>
          </div>
        </CardFooter>
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
                  description: "An insightful article about the trends shaping web development in 2023 and beyond.",
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
                    <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
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
                "productivity-tips": {
                  title: "The Art of Productivity: How to Get More Done in Less Time",
                  description:
                    "Practical tips and strategies for maximizing your productivity and achieving your goals.",
                  source: "linkedin.com",
                  sourceIcon: (
                    <svg className="h-4 w-4 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  date: "3 months ago",
                  category: "Productivity",
                  categoryColor: "bg-green-500",
                  isFavorite: true,
                },
              }

              const related = relatedBookmarks[relatedId as keyof typeof relatedBookmarks]

              if (!related) return null

              return (
                <Link href={`/bookmark/${relatedId}`} key={relatedId}>
                  <BookmarkCard
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
                  />
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
