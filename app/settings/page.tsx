import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Twitter, Instagram, Youtube, Globe, Bell, Moon, Sun, LogOut, CreditCard } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="container max-w-6xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 shrink-0">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent">
              <TabsTrigger
                value="account"
                className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted rounded-md w-full"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="connected-accounts"
                className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted rounded-md w-full"
              >
                Connected Accounts
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted rounded-md w-full"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted rounded-md w-full"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted rounded-md w-full"
              >
                Billing
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 space-y-8">
            <TabsContent value="account" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details and profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile</h3>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" defaultValue="Bookmark enthusiast and content curator" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar</Label>
                      <div className="flex items-center gap-4">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt="User avatar"
                          className="h-16 w-16 rounded-full"
                        />
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>

                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <Button>Update Password</Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" className="text-red-500" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="connected-accounts" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>
                    Connect your social media accounts to automatically save bookmarks and content.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Connected Platforms</h3>
                    <p className="text-xs text-muted-foreground">Last synced 5 minutes ago</p>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-3 border border-card-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                          <Twitter className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Twitter</h4>
                          <p className="text-sm text-muted-foreground">Save your liked tweets and bookmarks</p>
                        </div>
                      </div>
                      <Button variant="default" size="sm">
                        <Check className="mr-2 h-4 w-4" />
                        Connected
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-card-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30">
                          <Instagram className="h-5 w-5 text-pink-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Instagram</h4>
                          <p className="text-sm text-muted-foreground">Save your saved posts</p>
                        </div>
                      </div>
                      <Button variant="default" size="sm">
                        <Check className="mr-2 h-4 w-4" />
                        Connected
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-card-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30">
                          <Youtube className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">YouTube</h4>
                          <p className="text-sm text-muted-foreground">Save your watch later and liked videos</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-card-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
                          <Globe className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Medium</h4>
                          <p className="text-sm text-muted-foreground">Save your bookmarked articles</p>
                        </div>
                      </div>
                      <Button variant="default" size="sm">
                        <Check className="mr-2 h-4 w-4" />
                        Connected
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sync Settings</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-sync">Automatic Syncing</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically sync bookmarks from connected accounts
                        </p>
                      </div>
                      <Switch id="auto-sync" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sync-frequency">Sync Frequency</Label>
                        <p className="text-xs text-muted-foreground">How often to check for new content</p>
                      </div>
                      <Select defaultValue="hourly">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sync-history">Sync History</Label>
                        <p className="text-xs text-muted-foreground">Import historical content when connecting</p>
                      </div>
                      <Switch id="sync-history" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Disconnect All</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience with BookmarkVault.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Appearance</h3>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select defaultValue="system">
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              <span>Light</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              <span>Dark</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

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
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="save-threads">Save Threads</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically save comment threads with bookmarks
                        </p>
                      </div>
                      <Switch id="save-threads" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="archive-content">Archive Content</Label>
                        <p className="text-xs text-muted-foreground">
                          Save a full copy of content to prevent loss if original is removed
                        </p>
                      </div>
                      <Switch id="archive-content" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-categorize">Auto-Categorize</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically categorize bookmarks based on content
                        </p>
                      </div>
                      <Switch id="auto-categorize" defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="private-by-default">Private by Default</Label>
                        <p className="text-xs text-muted-foreground">Make all new bookmarks private by default</p>
                      </div>
                      <Switch id="private-by-default" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="analytics">Usage Analytics</Label>
                        <p className="text-xs text-muted-foreground">
                          Allow collection of anonymous usage data to improve the service
                        </p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive notifications from BookmarkVault</p>
                      </div>
                      <Switch id="notifications-enabled" defaultChecked />
                    </div>

                    <Separator />

                    <h3 className="text-lg font-medium">Notification Types</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">New Bookmarks</p>
                            <p className="text-xs text-muted-foreground">
                              When new bookmarks are automatically saved from connected accounts
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Content Removal</p>
                            <p className="text-xs text-muted-foreground">
                              When bookmarked content is removed from its original source
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Thread Updates</p>
                            <p className="text-xs text-muted-foreground">
                              When there are new comments on threads you've bookmarked
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Product Updates</p>
                            <p className="text-xs text-muted-foreground">News about product updates and new features</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <Separator />

                    <h3 className="text-lg font-medium">Delivery Methods</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Push Notifications</p>
                          <p className="text-xs text-muted-foreground">Browser and mobile notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">In-App Notifications</p>
                          <p className="text-xs text-muted-foreground">Notifications within the application</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Disable All</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your subscription and payment methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Current Plan</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/30">
                        Active
                      </Badge>
                    </div>

                    <div className="rounded-lg border border-card-border p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-xl font-bold">Pro Plan</h4>
                          <p className="text-sm text-muted-foreground">Billed annually</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">$8.99/month</p>
                          <p className="text-sm text-muted-foreground">$107.88/year</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <p className="text-sm">Unlimited bookmarks</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <p className="text-sm">Full content archiving</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <p className="text-sm">Connect up to 10 accounts</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <p className="text-sm">Advanced search and filtering</p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="outline" className="text-red-500">
                          Cancel Subscription
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>

                    <div className="rounded-lg border border-card-border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/30">
                            <CreditCard className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>

                    <div className="rounded-lg border border-card-border">
                      <div className="flex items-center justify-between p-4 border-b border-card-border">
                        <div>
                          <p className="font-medium">Pro Plan - Annual</p>
                          <p className="text-sm text-muted-foreground">May 1, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$107.88</p>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">Pro Plan - Annual</p>
                          <p className="text-sm text-muted-foreground">May 1, 2022</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$107.88</p>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
