import AuthForm from "../../api/auth/[...rest]/magic-link/auth-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in or create an account using a magic link
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
