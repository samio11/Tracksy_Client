"use client";
import { LoginForm } from "@/components/LoginComponent/login-form";
import { Suspense } from "react";
function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-sm md:max-w-4xl">
      <div className="animate-pulse bg-card rounded-lg p-8 h-96">
        <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-8"></div>
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
