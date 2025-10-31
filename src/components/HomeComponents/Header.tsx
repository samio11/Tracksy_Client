"use client";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { IoCar } from "react-icons/io5";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Loader from "@/app/(commonLayout)/loading";
import { toast } from "sonner";
import { logout } from "@/services/auth/auth.service";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading, refetchUser } = useUser();
  if (isLoading) return <Loader></Loader>;

  console.log(user, isLoading);
  const navLinks = (
    <>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
      >
        Home
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
      </Link>
      <Link
        href="/about"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
      >
        About
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
      </Link>
      <Link
        href="/contact"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
      >
        contact
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
      </Link>
    </>
  );

  const handleLogout = async () => {
    const toastId = toast.loading("User Logging Out...");
    try {
      await logout();
      toast.success("User Logout Done", { id: toastId });
      await refetchUser();
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message, { id: toastId });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  {/* <Sparkles className="text-white" size={20} /> */}
                  <IoCar className="text-white" size={20} />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-20 blur-sm -z-10" />
              </div>
              <span className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tracksy
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks}
            {user && user.role === "Rider" && (
              <Link
                href="/bookRide"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Create Ride
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
              </Link>
            )}
            {user && user.role === "Admin" && (
              <Link
                href="/Admin/state"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Admin Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
              </Link>
            )}
            {user && user.role === "Rider" && (
              <Link
                href="/Rider/profile"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Rider Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
              </Link>
            )}
            {user && user.role === "Driver" && (
              <Link
                href="/Driver/profile"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Driver Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
              </Link>
            )}
          </div>

          {/* Desktop CTA */}
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              {/* User Info */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 rounded-full border border-blue-600/20">
                <div className="flex flex-col text-right leading-tight">
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {user.role}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {user.email}
                  </span>
                </div>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Logout Button */}
              <Button
                variant="outline"
                onClick={() => handleLogout()}
                className="border-blue-600 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md">
                <Link href={"/login"}>Login</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks}
                {user && user.role === "Rider" && (
                  <Link
                    href="/bookRide"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    Create Ride
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
                  </Link>
                )}
                {user && user.role === "Admin" && (
                  <Link
                    href="/Admin/state"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    Admin Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
                  </Link>
                )}
                {user && user.role === "Rider" && (
                  <Link
                    href="/Rider/profile"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    Rider Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
                  </Link>
                )}
                {user && user.role === "Driver" && (
                  <Link
                    href="/Driver/profile"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    Driver Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all" />
                  </Link>
                )}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md">
                    <Link href={"/login"}>Login</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
