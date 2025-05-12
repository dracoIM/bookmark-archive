"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { set } from "better-auth";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API call delay
    const { data, error } = await authClient.signIn.magicLink({
      email: email,
      callbackURL: "/dashboard", //redirect after successful login (optional)
    });
    if (error)
      setMessage({
        type: "error",
        text: error.message ?? "Something went wrong",
      });
    else setMessage({ type: "success", text: " Please check your email" });
    setIsLoading(false);
  };

  return (
    <div className="rounded-lg border p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Magic Link"
          )}
        </Button>
      </form>

      {message && (
        <Alert
          className={`mt-4 items-center ${message.type == "success" ? "text-emerald-600" : ""}`}
          variant={message.type === "error" ? "destructive" : "default"}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 !text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
