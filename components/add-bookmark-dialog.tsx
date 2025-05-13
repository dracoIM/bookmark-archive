"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

export function AddBookmarkDialog() {
  const [open, setOpen] = useState(false);

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [image, setImage] = useState("");

  const handleFetch = async () => {
    if (!url) {
      alert("Please enter a URL first.");
      return;
    }

    try {
      const res = await fetch("/api/bookmark/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to fetch metadata");
        return;
      }

      setTitle(data.title || "");
      setDescription(data.description || "");
      setFaviconUrl(data.faviconUrl || "");
      setSiteName(data.siteName || "");
      setImage(data.image || "");
    } catch (err) {
      console.error("Error fetching metadata:", err);
      alert("Something went wrong.");
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/bookmark/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, title, description, platform, category }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to save bookmark");
        return;
      }

      setOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add new bookmark</DialogTitle>
          <DialogDescription>
            Enter the URL or manually fill in the details of the content you
            want to save.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* URL + Fetch */}
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button variant="outline" size="sm" onClick={handleFetch}>
              Fetch details
            </Button>
          </div>

          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Platform & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select onValueChange={setPlatform}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="inspiration">Inspiration</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview Card */}
          {title && (
            <div className="mt-4 border rounded-xl p-4 bg-muted space-y-3">
              <div className="flex items-center gap-2">
                {faviconUrl && (
                  <img src={faviconUrl} alt="Favicon" className="w-5 h-5" />
                )}
                <span className="text-sm text-muted-foreground">
                  {siteName || (url ? new URL(url).hostname : "")}
                </span>
              </div>
              <h4 className="text-base font-medium">{title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {description}
              </p>
              {image && (
                <img
                  src={image}
                  alt="Thumbnail"
                  className="rounded-md border w-full h-48 object-cover"
                />
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Bookmark</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
