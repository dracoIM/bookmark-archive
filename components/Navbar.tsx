import { Button } from "@/components/ui/button";
import { BookOpen, Search, Settings } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "./ui/input";
import SocialMediaConnect from "./social-media-connect";

const Navbar = () => {
  return (
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
          <SocialMediaConnect />
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
  );
};

export default Navbar;
