"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Twitter, Instagram, Youtube, Globe, Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsDialog() {
  const [open, setOpen] = useState(false)
  const [accounts, setAccounts] = useState({
    twitter: true,
    instagram: true,
    youtube: false,
    medium: true,
  })

  const toggleAccount = (account: keyof typeof accounts) => {
    setAccounts((prev) => ({
      ...prev,
      [account]: !prev[account],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings and preferences.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Connected Accounts</h3>
              <p className="text-xs text-muted-foreground">Last synced 5 minutes ago</p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <Twitter className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Twitter</h4>
                    <p className="text-sm text-muted-foreground">Save your liked tweets and bookmarks</p>
                  </div>
                </div>
                <Button
                  variant={accounts.twitter ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAccount("twitter")}
                >
                  {accounts.twitter ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Connected
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100">
                    <Instagram className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Instagram</h4>
                    <p className="text-sm text-muted-foreground">Save your saved posts</p>
                  </div>
                </div>
                <Button
                  variant={accounts.instagram ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAccount("instagram")}
                >
                  {accounts.instagram ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Connected
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                    <Youtube className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">YouTube</h4>
                    <p className="text-sm text-muted-foreground">Save your watch later and liked videos</p>
                  </div>
                </div>
                <Button
                  variant={accounts.youtube ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAccount("youtube")}
                >
                  {accounts.youtube ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Connected
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                    <Globe className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Medium</h4>
                    <p className="text-sm text-muted-foreground">Save your bookmarked articles</p>
                  </div>
                </div>
                <Button
                  variant={accounts.medium ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAccount("medium")}
                >
                  {accounts.medium ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Connected
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="auto-sync">Automatic Syncing</Label>
                <p className="text-xs text-muted-foreground">Automatically sync bookmarks from connected accounts</p>
              </div>
              <Switch id="auto-sync" defaultChecked />
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-view">Default View</Label>
                <Select defaultValue="grid">
                  <SelectTrigger id="default-view">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications about new bookmarks</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="save-threads">Save Threads</Label>
                  <p className="text-xs text-muted-foreground">Automatically save comment threads with bookmarks</p>
                </div>
                <Switch id="save-threads" defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" defaultValue="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Bookmark enthusiast and content curator" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg?height=64&width=64" alt="User avatar" className="h-16 w-16 rounded-full" />
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
