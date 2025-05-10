"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, Reply, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

interface CommentThreadProps {
  comments: Comment[]
}

export function CommentThread({ comments }: CommentThreadProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Thread</h4>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const hasReplies = comment.replies && comment.replies.length > 0

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg?height=32&width=32"} />
          <AvatarFallback>{comment.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
            </div>
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4 pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1 text-muted-foreground"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`h-3.5 w-3.5 mr-1 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-xs">{liked ? comment.likes + 1 : comment.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-1 text-muted-foreground">
              <Reply className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Reply</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-1 text-muted-foreground">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Copy text</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {hasReplies && (
        <div className="pl-11">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Hide replies
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Show {comment.replies?.length} {comment.replies?.length === 1 ? "reply" : "replies"}
              </>
            )}
          </Button>

          {showReplies && (
            <div className="mt-3 space-y-3">
              {comment.replies?.map((reply) => (
                <div key={reply.id} className="flex gap-3">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={reply.author.avatar || "/placeholder.svg?height=28&width=28"} />
                    <AvatarFallback>{reply.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{reply.author.name}</span>
                        <span className="text-xs text-muted-foreground">@{reply.author.username}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                    <div className="flex items-center gap-4 pt-1">
                      <Button variant="ghost" size="sm" className="h-6 px-1 text-muted-foreground">
                        <Heart className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">{reply.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-1 text-muted-foreground">
                        <Reply className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
