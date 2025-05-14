"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Moon,
  Sun,
  Twitter,
  Youtube,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";

type SocialPlatform = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  connected: boolean;
};

interface SocialMediaConnectProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function SocialMediaConnect({
  open,
  onOpenChange,
}: SocialMediaConnectProps) {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      color: "bg-[#1DA1F2] hover:bg-[#1a94df]",
      connected: false,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      color:
        "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90",
      connected: false,
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-[#4267B2] hover:bg-[#3b5998]",
      connected: false,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-[#0077B5] hover:bg-[#006699]",
      connected: false,
    },
    {
      id: "github",
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      color: "bg-[#333] hover:bg-[#24292e]",
      connected: false,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      color: "bg-[#FF0000] hover:bg-[#cc0000]",
      connected: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState("connect");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const FREE_LIMIT = 3;
  const { theme, setTheme } = useTheme();

  const connectedCount = platforms.filter((p) => p.connected).length;

  // Auto-save connections when they're made
  useEffect(() => {
    if (connectedCount > 0) {
      const connectedPlatforms = platforms.filter((p) => p.connected);
      console.log("Auto-saving connected platforms:", connectedPlatforms);
      // Here you would typically send the data to your backend
    }
  }, [connectedCount, platforms]);

  const handleConnect = (id: string) => {
    // Check if connecting this would exceed the free limit
    if (
      connectedCount >= FREE_LIMIT &&
      !platforms.find((p) => p.id === id)?.connected
    ) {
      setShowUpgradeDialog(true);
      return;
    }

    setPlatforms(
      platforms.map((platform) =>
        platform.id === id ? { ...platform, connected: true } : platform
      )
    );
    setError("");
  };

  const handleDisconnect = (id: string) => {
    setPlatforms(
      platforms.map((platform) =>
        platform.id === id ? { ...platform, connected: false } : platform
      )
    );
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="absolute right-12 top-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl text-center">
              Connect Your Social Media
            </DialogTitle>
            <DialogDescription className="text-base text-center">
              Link your social media accounts to enhance your profile
              <div className="mt-2 text-sm font-medium">
                Free plan: <span className="font-bold">{connectedCount}</span>/
                <span className="font-bold">{FREE_LIMIT}</span> connections used
              </div>
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mt-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="connect">Connect Accounts</TabsTrigger>
              <TabsTrigger value="success" disabled={!isSubmitted}>
                Success
              </TabsTrigger>
            </TabsList>
            <TabsContent value="connect" className="space-y-4 mt-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`border rounded-lg overflow-hidden p-6 ${
                      platform.connected
                        ? "border-green-500 dark:border-green-400 bg-green-50/50 dark:bg-green-900/20"
                        : "border-border"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${platform.color}`}
                      >
                        {platform.icon}
                      </div>
                      <div className="font-medium">{platform.name}</div>

                      {platform.connected ? (
                        <div className="flex flex-col items-center gap-2 w-full">
                          <div className="flex items-center text-green-500 dark:text-green-400">
                            <CheckCircle2 className="h-5 w-5 mr-1" />
                            <span className="text-sm">Connected</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(platform.id)}
                            className="w-full"
                          >
                            Disconnect
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className={`text-white ${platform.color} w-full`}
                          onClick={() => handleConnect(platform.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {connectedCount > 0 && (
                <div className="flex justify-center mt-6">
                  <Button onClick={() => setIsSubmitted(true)} className="px-8">
                    Done
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="success" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your social media accounts have been successfully connected.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {platforms
                    .filter((p) => p.connected)
                    .map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center gap-2 bg-muted px-3 py-2 rounded-full"
                      >
                        {platform.icon}
                        <span>{platform.name}</span>
                      </div>
                    ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  You can manage your connected accounts in your profile
                  settings at any time.
                </p>

                <Button
                  onClick={() => {
                    setActiveTab("connect");
                    setIsSubmitted(false);
                  }}
                  variant="outline"
                  className="mt-6"
                >
                  Edit Connections
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade Your Plan</DialogTitle>
            <DialogDescription>
              You've reached the limit of 3 social media connections on the free
              plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">Premium Plan Benefits:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Connect unlimited social media accounts</li>
                <li>Advanced analytics and insights</li>
                <li>Priority customer support</li>
                <li>Custom branding options</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => setShowUpgradeDialog(false)}
            >
              Maybe Later
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Upgrade Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
