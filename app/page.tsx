import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Check,
  ArrowRight,
  Star,
  Shield,
  Zap,
  BookMarked,
  Users,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>BookmarkVault</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/magic-link    `">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Never Lose Your Favorite{" "}
              <span className="text-primary">Content</span> Again
            </h1>
            <p className="text-xl text-muted-foreground max-w-[800px] mb-10">
              BookmarkVault automatically saves and organizes your bookmarks,
              tweets, posts, and videos from across the web, even if the
              original content gets deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Start Saving Content
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="mt-16 relative w-full max-w-5xl">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
              <img
                src="/placeholder.svg?height=600&width=1000"
                alt="BookmarkVault Dashboard"
                className="w-full rounded-lg border border-card-border shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need to Save What Matters
              </h2>
              <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                BookmarkVault is designed to preserve and organize all your
                favorite online content in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Archive className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Full Content Archiving
                    </h3>
                    <p className="text-muted-foreground">
                      Save complete copies of articles, tweets, and posts so you
                      never lose content, even if the original is deleted.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Automatic Saving</h3>
                    <p className="text-muted-foreground">
                      Connect your social accounts and automatically save your
                      likes, bookmarks, and saved posts without any extra
                      effort.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <BookMarked className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Smart Organization
                    </h3>
                    <p className="text-muted-foreground">
                      Automatically categorize and tag your content for easy
                      searching and browsing later.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Thread Preservation
                    </h3>
                    <p className="text-muted-foreground">
                      Save entire conversation threads and comments along with
                      the original content.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Privacy Controls</h3>
                    <p className="text-muted-foreground">
                      Choose what to share and what to keep private with
                      granular privacy settings for all your saved content.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Advanced Search</h3>
                    <p className="text-muted-foreground">
                      Find exactly what you're looking for with powerful search
                      and filtering capabilities across all your saved content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                Choose the plan that's right for you and start saving your
                favorite content today.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-muted">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-5">
                      <h3 className="text-xl font-bold mb-2">Free</h3>
                      <p className="text-muted-foreground mb-4">
                        Perfect for getting started
                      </p>
                      <div className="flex items-baseline mb-5">
                        <span className="text-3xl font-bold">$0</span>
                        <span className="text-muted-foreground ml-1">
                          /month
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Up to 100 bookmarks</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Basic search</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Connect 1 social account</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>7-day content history</span>
                      </li>
                    </ul>

                    <Link href="/dashboard" className="mt-auto">
                      <Button variant="outline" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-5">
                      <h3 className="text-xl font-bold mb-2">Pro</h3>
                      <p className="text-muted-foreground mb-4">
                        For serious content collectors
                      </p>
                      <div className="flex items-baseline mb-5">
                        <span className="text-3xl font-bold">$8.99</span>
                        <span className="text-muted-foreground ml-1">
                          /month
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Unlimited bookmarks</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Full content archiving</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Connect up to 5 social accounts</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Advanced search and filtering</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Thread preservation</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Unlimited content history</span>
                      </li>
                    </ul>

                    <Link href="/dashboard" className="mt-auto">
                      <Button className="w-full">Subscribe Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-muted">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-5">
                      <h3 className="text-xl font-bold mb-2">Team</h3>
                      <p className="text-muted-foreground mb-4">
                        For teams and organizations
                      </p>
                      <div className="flex items-baseline mb-5">
                        <span className="text-3xl font-bold">$19.99</span>
                        <span className="text-muted-foreground ml-1">
                          /month
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Everything in Pro</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Up to 5 team members</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Shared collections</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Team workspace</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Admin controls</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Priority support</span>
                      </li>
                    </ul>

                    <Link href="/dashboard" className="mt-auto">
                      <Button variant="outline" className="w-full">
                        Contact Sales
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                All plans include a 14-day free trial. No credit card required.
              </p>
              <Link href="#faq">
                <Button variant="link">Have questions? Check our FAQ</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                Join thousands of content creators, researchers, and knowledge
                workers who trust BookmarkVault.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="User avatar"
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-medium">Sarah Johnson</h4>
                        <p className="text-sm text-muted-foreground">
                          Content Creator
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground flex-1">
                      "BookmarkVault has been a game-changer for my research. I
                      used to lose track of important articles all the time, but
                      now everything is organized and searchable. Even better, I
                      can access content that's been taken down from the
                      original source!"
                    </p>
                    <div className="flex mt-4">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="User avatar"
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-medium">Michael Chen</h4>
                        <p className="text-sm text-muted-foreground">
                          UX Designer
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground flex-1">
                      "As a designer, I'm constantly saving inspiration from all
                      over the web. BookmarkVault automatically organizes
                      everything by platform and category, making it super easy
                      to find what I need when I'm working on a new project."
                    </p>
                    <div className="flex mt-4">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="User avatar"
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-medium">Alex Rodriguez</h4>
                        <p className="text-sm text-muted-foreground">
                          Journalist
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground flex-1">
                      "I can't count how many times BookmarkVault has saved me
                      when researching stories. Content that disappears from the
                      web is still available in my vault, complete with the
                      original threads and comments. It's an essential tool for
                      my work."
                    </p>
                    <div className="flex mt-4">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2">
                    How does BookmarkVault save content that gets deleted?
                  </h3>
                  <p className="text-muted-foreground">
                    When you save content to BookmarkVault, we create a complete
                    archive of the page, including text, images, and embedded
                    media. This means that even if the original content is
                    removed from the web, you'll still have access to your saved
                    version.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2">
                    Can I share my bookmarks with others?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! BookmarkVault makes it easy to share individual
                    bookmarks or entire collections with others. You can
                    generate shareable links or embed your collections on your
                    website or blog.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2">
                    Which platforms can I connect to BookmarkVault?
                  </h3>
                  <p className="text-muted-foreground">
                    BookmarkVault currently supports Twitter, Instagram,
                    YouTube, Medium, and more. We're constantly adding new
                    integrations based on user feedback.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2">
                    Is my data private and secure?
                  </h3>
                  <p className="text-muted-foreground">
                    Absolutely. Your bookmarks are private by default, and we
                    use industry-standard encryption to protect your data. You
                    have complete control over what you share and what you keep
                    private.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2">
                    Can I export my bookmarks?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, you can export your bookmarks in various formats,
                    including CSV, JSON, and HTML. This makes it easy to back up
                    your data or migrate to another service if needed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Saving Your Favorite Content?
            </h2>
            <p className="text-xl opacity-90 max-w-[800px] mx-auto mb-8">
              Join thousands of users who trust BookmarkVault to preserve and
              organize their online discoveries.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started for Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-5 w-5" />
              <span className="font-semibold">BookmarkVault</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BookmarkVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
