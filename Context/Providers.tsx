"use client";
import React, { ReactNode } from "react";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export const Providers = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const router = useRouter();
  return (
    <AuthUIProvider
      authClient={authClient as any}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  );
};
