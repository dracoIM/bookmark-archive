"use client";

import { useEffect, useState } from "react";
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

import { Loader, PlusCircle, Search } from "lucide-react";
import { NewBookMark } from "@/lib/zodSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export function AddBookmarkDialog() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<NewBookMark>({
    url: "",
    title: "",
    description: "",
    imageUrl: "",
    markdown: "",
    faviconUrl: "",
    siteName: "",
  });
  const [open, setOpen] = useState(false);
  const fetchDetailQuery = useMutation({
    mutationFn: async () => {
      if (!formData.url) return;
      const res = await axios.post("/api/bookmark/fetch", {
        url: formData.url,
      });
      const data = res.data;
      setFormData({
        url: formData.url,
        title: data.title,
        description: data.description,
        imageUrl: data.image,
        faviconUrl: data.faviconUrl,
        siteName: data.siteName,
        markdown: data.markdown,
      });
      return res.data;
    },
    onError(error) {
      console.error("Error fetching metadata:", error);
      toast.error("Something went wrong.");
      return false;
    },
  });
  const isDetailsFetching = fetchDetailQuery.isPending;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isDetailsFetching) fetchDetailQuery.mutate();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [formData.url]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post("/api/bookmark/save", formData);
      setOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Something went wrong while saving.");
    }
    setIsSaving(false);
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
            <div className="flex gap-2">
              <Input
                id="url"
                placeholder="https://example.com/article"
                value={formData.url}
                disabled={isDetailsFetching}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => fetchDetailQuery.mutate()}
                disabled={isDetailsFetching}
              >
                {isDetailsFetching ? (
                  <Loader className="h-6 w-6 animate-spin" />
                ) : (
                  <Search className="h-6 w-6" />
                )}{" "}
              </Button>
            </div>
          </div>

          {/* Title */}
          {/* <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Article title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div> */}

          {/* Description */}
          {/* <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the content"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div> */}

          {/* Platform & Category */}
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* <div className="grid gap-2">
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
            </div> */}

          {/* <div className="grid gap-2">
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
          </div> */}

          {/* Preview Card */}
          {formData.title && (
            <div className="mt-4 border rounded-xl p-4 bg-muted space-y-3">
              <div className="flex items-center gap-2">
                {formData.faviconUrl && (
                  <img
                    src={formData.faviconUrl}
                    alt="Favicon"
                    className="w-5 h-5"
                  />
                )}
                <span className="text-sm text-muted-foreground">
                  {formData.siteName ||
                    (formData.url ? new URL(formData.url).hostname : "")}
                </span>
              </div>
              <h4 className="text-base font-medium">{formData.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {formData.description}
              </p>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
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
          <Button onClick={handleSave} disabled={isDetailsFetching || isSaving}>
            {isDetailsFetching
              ? "Fetching..."
              : isSaving
                ? "Saving..."
                : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
