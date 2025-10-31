"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Lottie from "lottie-react"; // ✅ Lottie import
import loginAnimation from "../../../public/Login.json";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { googleLogin, login } from "@/services/auth/auth.service";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

// ✅ Validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const search = useSearchParams().get("redirect") || "/";
  const { refetchUser } = useUser();

  async function onSubmit(userData: z.infer<typeof formSchema>) {
    const toastId = toast.loading("User is Logging...");
    try {
      const res = await login(userData);
      if (res?.success) {
        toast.success("User Login done", { id: toastId });
        await refetchUser();
        router.push(search);
      } else {
        toast.error("User Login Failed", { id: toastId });
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message, { id: toastId });
    }
  }
  async function googleLoginFn() {
    const toastId = toast.loading("Redirecting to Google...");
    try {
      // Simply redirect the browser to your backend's Google auth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND}/auth/google`;
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message, { id: toastId });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* LEFT FORM SIDE */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your TrackSy account
                    </p>
                  </div>

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Field>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </Field>

                  {/* Separator */}
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>

                  {/* Social Buttons */}
                  <Field className="grid grid-cols-1 gap-4">
                    <Button
                      onClick={() => googleLoginFn()}
                      variant="outline"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                  </Field>

                  {/* Sign up */}
                  <FieldDescription className="text-center">
                    Don&apos;t have a Rider account?{" "}
                    <Link
                      href="/register-rider"
                      className="text-blue-500 underline"
                    >
                      Register Now
                    </Link>
                  </FieldDescription>
                  <FieldDescription className="text-center">
                    Don&apos;t have a Driver account?{" "}
                    <Link
                      href="/register-driver"
                      className="text-blue-500 underline"
                    >
                      Register Now
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
            </Form>
          </div>

          {/* RIGHT SIDE (Lottie Animation) */}
          <div className="bg-muted relative hidden md:flex items-center justify-center">
            <Lottie
              animationData={loginAnimation}
              loop
              className="w-full max-w-md"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
