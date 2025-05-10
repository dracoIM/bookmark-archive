import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkCard } from "@/components/bookmark-card";
import { AddBookmarkDialog } from "@/components/add-bookmark-dialog";
import { ShareArchiveDialog } from "@/components/share-archive-dialog";
import {
  Search,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  BookOpen,
  LayoutGrid,
  LayoutList,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    return redirect("/auth/magic-link");
  }

  const data = await prisma.bookmark.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>BookmarkVault</span>
          </div>

          <div className="relative w-full max-w-sm px-4">
            <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your bookmarks..."
              className="w-full pl-10 rounded-full bg-muted"
            />
          </div>

          <div className="flex items-center gap-4">
            <AddBookmarkDialog />
            <ThemeToggle />
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="User avatar"
                className="h-8 w-8 rounded-full"
              />
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-6">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Button variant="ghost" className="justify-start gap-2 px-2 mb-1">
              <Globe className="h-4 w-4" />
              All Bookmarks
            </Button>

            <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground">
              Categories
            </h3>

            <Button variant="ghost" className="justify-start gap-2 px-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              Technology
            </Button>
            <Button variant="ghost" className="justify-start gap-2 px-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Design
            </Button>
            <Button variant="ghost" className="justify-start gap-2 px-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Productivity
            </Button>
            <Button variant="ghost" className="justify-start gap-2 px-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              Inspiration
            </Button>
            <Button variant="ghost" className="justify-start gap-2 px-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              Learning
            </Button>
          </nav>
        </aside>

        <main className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">
              All Bookmarks
            </h1>
            <div className="flex items-center gap-2">
              <ShareArchiveDialog />
              <div className="flex items-center rounded-md border border-card-border bg-background p-1">
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2.5">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2.5">
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <p>
              Automatically saving bookmarks and threads from your connected
              accounts. Last synced 5 minutes ago.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="threads">Threads</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((bookmark) => (
                  <Link key={bookmark.id} href={`/bookmark/${bookmark.id}`}>
                    <BookmarkCard bookmark={bookmark} />
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
