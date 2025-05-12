import { Button } from "@/components/ui/button";
import { BookmarkDetailView } from "@/components/bookmark-detail-view";
import { DeletedContentFallback } from "@/components/deleted-content-fallback";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShareArchiveDialog } from "@/components/share-archive-dialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function BookmarkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const bookmark = await prisma.bookmark.findUnique({
    where: {
      id: (await params).id,
    },
  });

  if (!session || session.user.id !== bookmark?.userId) {
    return redirect("/auth/magic-link");
  }

  if (!bookmark) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to bookmarks
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h1 className="text-2xl font-bold mb-4"> Bookmark Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The bookmark you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/dashboard">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to bookmarks
          </Button>
        </Link>

        <ShareArchiveDialog />
      </div>

      {/* {bookmark.isDeleted ? <DeletedContentFallback bookmark={bookmark} /> : <BookmarkDetailView bookmark={bookmark} />} */}
    </div>
  );
}
