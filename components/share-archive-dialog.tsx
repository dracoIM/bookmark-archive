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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link,
  Copy,
  Check,
} from "lucide-react";
import { useParams } from "next/navigation";

export function ShareArchiveDialog() {
  const params = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSettings, setShareSettings] = useState({
    publicAccess: true,
    allowComments: false,
    showCategories: true,
    showSources: true,
  });

  const toggleSetting = (setting: keyof typeof shareSettings) => {
    setShareSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "https://bookmarkvault.app/share/your-archive-id"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Share2 className="h-4 w-4" />
          Share Archive
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Share your bookmark archive</DialogTitle>
          <DialogDescription>
            Create a shareable link to your entire bookmark collection or
            customize what to share.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>
          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-access">Public Access</Label>
                  <p className="text-xs text-muted-foreground">
                    Anyone with the link can view your bookmarks
                  </p>
                </div>
                <Switch
                  id="public-access"
                  checked={shareSettings.publicAccess}
                  onCheckedChange={() => toggleSetting("publicAccess")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-categories">Show Categories</Label>
                  <p className="text-xs text-muted-foreground">
                    Display category labels on shared bookmarks
                  </p>
                </div>
                <Switch
                  id="show-categories"
                  checked={shareSettings.showCategories}
                  onCheckedChange={() => toggleSetting("showCategories")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-sources">Show Sources</Label>
                  <p className="text-xs text-muted-foreground">
                    Display source information on shared bookmarks
                  </p>
                </div>
                <Switch
                  id="show-sources"
                  checked={shareSettings.showSources}
                  onCheckedChange={() => toggleSetting("showSources")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-link"
                  value="https://bookmarkvault.app/share/your-archive-id"
                  readOnly
                />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Share on Social Media</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Twitter className="h-5 w-5 text-blue-500" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Facebook className="h-5 w-5 text-blue-600" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Link className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="embed" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="embed-code">Embed Code</Label>
              <Input
                id="embed-code"
                value='<iframe src="https://bookmarkvault.app/embed/your-archive-id" width="100%" height="500" frameborder="0"></iframe>'
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                Copy and paste this code to embed your bookmark collection on
                your website or blog.
              </p>
            </div>

            <div className="border rounded-md p-4 bg-muted">
              <div className="text-sm font-medium mb-2">Preview</div>
              <div className="border rounded bg-background h-[200px] flex items-center justify-center text-sm text-muted-foreground">
                Your embedded bookmark collection will appear here
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Generate Link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
