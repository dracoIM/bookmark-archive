"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Share,
  MoreHorizontal,
  BookmarkIcon,
  Trash,
  Edit,
  ExternalLink,
  Twitter,
  Instagram,
  Globe,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CommentThread } from "@/components/comment-thread";
import Link from "next/link";
import { format } from "date-fns";
import { Bookmark } from "@prisma/client";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  // const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showThread, setShowThread] = useState(false);

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${false ? "border-l-4 border-l-blue-500" : ""} ${
        false
          ? "border-yellow-200/50 bg-yellow-50/50 dark:bg-yellow-950/10 dark:border-yellow-900/20"
          : ""
      }`}
    >
      {bookmark.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={bookmark.imageUrl}
            alt={bookmark.title}
            className={`h-full w-full object-cover transition-transform hover:scale-105 ${
              false ? "opacity-70 filter grayscale" : ""
            }`}
          />
          {false && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="rounded-full bg-yellow-100 p-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          )}
        </div>
      )}
      <CardContent className={`${bookmark.imageUrl ? "pt-4" : "pt-6"} pb-2`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <img
              src={bookmark.faviconUrl ?? ""}
              alt={bookmark.title}
              className="h-4 w-4"
            />
          </div>
          <div className="flex items-center gap-2">
            {false && (
              <Badge variant="outline" className="text-xs gap-1 font-normal">
                <MessageCircle className="h-3 w-3" />
                {/* {commentCount} */}
              </Badge>
            )}
            {/* <div className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${categoryColor}`} />
              <span className="text-xs text-muted-foreground">{category}</span>
            </div> */}
          </div>
        </div>

        <h3 className="font-semibold leading-tight mb-1.5">{bookmark.title}</h3>

        {/* {isDeleted && (
          <div className="mb-2">
            <Badge
              variant="outline"
              className="text-xs gap-1 font-normal border-yellow-300 text-yellow-700 bg-yellow-50"
            >
              <AlertTriangle className="h-3 w-3" />
              Content removed
            </Badge>
          </div>
        )} */}

        <p className="text-sm text-muted-foreground line-clamp-2">
          {bookmark.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0 pb-4">
        <span className="text-xs text-muted-foreground">
          {format(bookmark.createdAt, "LLL d, yy")}
        </span>
        <div className="flex items-center gap-1">
          {/* <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">Favorite</span>
          </Button> */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <Share className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          {/* {hasThread && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowThread(!showThread)}>
              {showThread ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="sr-only">Show Thread</span>
            </Button>
          )} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={`/bookmark/${bookmark.id || "placeholder-id"}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Add to collection
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>

      {/* {showThread && threadData && (
        <div className="border-t px-4 py-3">
          <CommentThread comments={threadData.comments} />
        </div>
      )} */}

      {showShareOptions && (
        <div className="p-4 pt-0">
          <div className="rounded-md border border-card-border bg-muted p-3">
            <h4 className="text-sm font-medium mb-2">Share this bookmark</h4>
            <div className="flex gap-2 mb-3">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Twitter className="h-4 w-4 text-blue-500" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Instagram className="h-4 w-4 text-pink-500" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Globe className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                value={
                  shareUrl ||
                  `https://bookmarkvault.app/share/${bookmark.id || bookmark.title.toLowerCase().replace(/\s+/g, "-")}`
                }
                readOnly
                className="h-8 text-xs"
              />
              <Button
                variant="secondary"
                size="sm"
                className="h-8 shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText(
                    shareUrl ||
                      `https://bookmarkvault.app/share/${bookmark.id || bookmark.title.toLowerCase().replace(/\s+/g, "-")}`
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
