"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Book,
  Moon,
  Sun,
  Minus,
  Plus,
  AlignLeft,
  AlignCenter,
  Type,
  X,
  Bookmark,
  Highlighter,
  Share2,
  Eye,
  Settings,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface ReadingModeProps {
  children: React.ReactNode
  title: string
  onClose: () => void
}

export function ReadingMode({ children, title, onClose }: ReadingModeProps) {
  const [fontSize, setFontSize] = useState(18)
  const [lineHeight, setLineHeight] = useState(1.8)
  const [theme, setTheme] = useState<"light" | "dark" | "sepia" | "eye-protection">("light")
  const [alignment, setAlignment] = useState<"left" | "center" | "justify">("left")
  const [fontFamily, setFontFamily] = useState<"serif" | "sans" | "mono">("serif")
  const [progress, setProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [eyeProtectionFilter, setEyeProtectionFilter] = useState(false)
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false)

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const clientHeight = document.documentElement.clientHeight || window.innerHeight

      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100
      setProgress(scrolled)

      // Hide controls while scrolling
      if (showControls) {
        setShowControls(false)
      }

      // Show controls after scrolling stops
      clearTimeout(window.scrollTimeout)
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
        setShowControls(true)
      }, 1000) as unknown as number
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(window.scrollTimeout)
    }
  }, [showControls])

  // Font size keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Increase font size with Ctrl/Cmd +
      if ((e.ctrlKey || e.metaKey) && e.key === "+") {
        e.preventDefault()
        setFontSize((prev) => Math.min(prev + 1, 28))
      }
      // Decrease font size with Ctrl/Cmd -
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault()
        setFontSize((prev) => Math.max(prev - 1, 14))
      }
      // Toggle theme with Ctrl/Cmd + L
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault()
        setTheme((prev) => (prev === "light" ? "dark" : prev === "dark" ? "sepia" : "light"))
      }
      // Exit reading mode with Escape
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case "serif":
        return "font-serif"
      case "sans":
        return "font-sans"
      case "mono":
        return "font-mono"
      default:
        return "font-serif"
    }
  }

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "justify":
        return "text-justify"
      default:
        return "text-left"
    }
  }

  const getThemeClass = () => {
    switch (theme) {
      case "light":
        return "bg-white text-gray-900"
      case "dark":
        return "bg-gray-900 text-gray-100"
      case "sepia":
        return "bg-[#f8f2e4] text-[#5f4b32]"
      case "eye-protection":
        return "bg-[#f0ead6] text-[#333333] eye-protection-mode"
      default:
        return "bg-white text-gray-900"
    }
  }

  useEffect(() => {
    // Add CSS for eye protection mode
    setEyeProtectionFilter(theme === "eye-protection")
    if (theme === "eye-protection") {
      document.documentElement.style.setProperty(
        "--eye-protection-filter",
        "brightness(0.95) contrast(0.95) sepia(0.15)",
      )
    } else {
      document.documentElement.style.removeProperty("--eye-protection-filter")
    }

    return () => {
      document.documentElement.style.removeProperty("--eye-protection-filter")
    }
  }, [theme])

  return (
    <div className={cn("fixed inset-0 z-50 overflow-y-auto transition-colors duration-300", getThemeClass())}>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary transition-all duration-300 z-50"
        style={{ width: `${progress}%` }}
      />

      {/* Top controls */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 p-4 flex justify-between items-center transition-opacity duration-300 z-40",
          isScrolling ? "opacity-0" : "opacity-100",
          theme === "light"
            ? "bg-white/80 backdrop-blur-sm"
            : theme === "dark"
              ? "bg-gray-900/80 backdrop-blur-sm"
              : "bg-[#f8f2e4]/80 backdrop-blur-sm",
        )}
      >
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close reading mode</span>
        </Button>

        <h2 className="text-sm font-medium truncate max-w-[50%]">{title}</h2>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      {theme === "light" ? (
                        <Sun className="h-5 w-5" />
                      ) : theme === "dark" ? (
                        <Moon className="h-5 w-5" />
                      ) : theme === "sepia" ? (
                        <Book className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change theme (Ctrl+L)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <div className="p-2 space-y-2">
                <p className="text-sm font-medium mb-2">Reading Theme</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="justify-start"
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="justify-start"
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "sepia" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("sepia")}
                    className="justify-start"
                  >
                    <Book className="h-4 w-4 mr-2" />
                    Sepia
                  </Button>
                  <Button
                    variant={theme === "eye-protection" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("eye-protection")}
                    className="justify-start"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Eye Protection
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setFontSize((prev) => Math.max(prev - 1, 14))}>
                  <Minus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Decrease font size (Ctrl+-)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setFontSize((prev) => Math.min(prev + 1, 28))}>
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Increase font size (Ctrl++)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Type className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Text options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Font Family</p>
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={fontFamily === "serif" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFontFamily("serif")}
                    className="flex-1 font-serif"
                  >
                    Serif
                  </Button>
                  <Button
                    variant={fontFamily === "sans" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFontFamily("sans")}
                    className="flex-1 font-sans"
                  >
                    Sans
                  </Button>
                  <Button
                    variant={fontFamily === "mono" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFontFamily("mono")}
                    className="flex-1 font-mono"
                  >
                    Mono
                  </Button>
                </div>

                <p className="text-sm font-medium mb-2">Text Alignment</p>
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={alignment === "left" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAlignment("left")}
                    className="flex-1"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={alignment === "center" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAlignment("center")}
                    className="flex-1"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={alignment === "justify" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAlignment("justify")}
                    className="flex-1"
                  >
                    <AlignLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>

                <p className="text-sm font-medium mb-2">Line Height: {lineHeight.toFixed(1)}</p>
                <Slider
                  value={[lineHeight]}
                  min={1.2}
                  max={2.5}
                  step={0.1}
                  onValueChange={(value) => setLineHeight(value[0])}
                  className="mb-4"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-16">
        <div
          className={cn(
            "mx-auto px-4 sm:px-6 md:px-8 max-w-3xl transition-all",
            getFontFamilyClass(),
            getAlignmentClass(),
            theme === "eye-protection" && "filter-eye-protection",
          )}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            filter: theme === "eye-protection" ? "var(--eye-protection-filter)" : "none",
          }}
        >
          {children}
        </div>
      </div>

      {/* Bottom controls */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center transition-opacity duration-300 z-40",
          isScrolling ? "opacity-0" : "opacity-100",
          theme === "light"
            ? "bg-white/80 backdrop-blur-sm"
            : theme === "dark"
              ? "bg-gray-900/80 backdrop-blur-sm"
              : "bg-[#f8f2e4]/80 backdrop-blur-sm",
        )}
      >
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save bookmark</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Highlighter className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Highlight text</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}>
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reading preferences</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Customization Panel */}
      <div
        className={cn(
          "fixed bottom-16 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all duration-300 z-40 w-[90%] max-w-2xl",
          isScrolling || !showCustomizationPanel ? "opacity-0 pointer-events-none" : "opacity-100",
          theme === "light"
            ? "bg-white/95 backdrop-blur-sm"
            : theme === "dark"
              ? "bg-gray-900/95 backdrop-blur-sm"
              : theme === "eye-protection"
                ? "bg-[#f0ead6]/95 backdrop-blur-sm"
                : "bg-[#f8f2e4]/95 backdrop-blur-sm",
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Reading Preferences</h3>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium">Font Size: {fontSize}px</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => setFontSize((prev) => Math.max(prev - 1, 14))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Slider
                  value={[fontSize]}
                  min={14}
                  max={28}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => setFontSize((prev) => Math.min(prev + 1, 28))}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium">Line Height: {lineHeight.toFixed(1)}</p>
              <Slider
                value={[lineHeight]}
                min={1.2}
                max={2.5}
                step={0.1}
                onValueChange={(value) => setLineHeight(value[0])}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium">Font Family</p>
              <div className="flex gap-1">
                <Button
                  variant={fontFamily === "serif" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontFamily("serif")}
                  className="flex-1 font-serif text-xs h-7"
                >
                  Serif
                </Button>
                <Button
                  variant={fontFamily === "sans" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontFamily("sans")}
                  className="flex-1 font-sans text-xs h-7"
                >
                  Sans
                </Button>
                <Button
                  variant={fontFamily === "mono" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontFamily("mono")}
                  className="flex-1 font-mono text-xs h-7"
                >
                  Mono
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium">Text Alignment</p>
              <div className="flex gap-1">
                <Button
                  variant={alignment === "left" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAlignment("left")}
                  className="flex-1 h-7"
                >
                  <AlignLeft className="h-3 w-3" />
                </Button>
                <Button
                  variant={alignment === "center" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAlignment("center")}
                  className="flex-1 h-7"
                >
                  <AlignCenter className="h-3 w-3" />
                </Button>
                <Button
                  variant={alignment === "justify" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAlignment("justify")}
                  className="flex-1 h-7"
                >
                  <AlignLeft className="h-3 w-3 rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
