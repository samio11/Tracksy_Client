import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Apple,
  Smartphone,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog", "Contact"],
  Products: ["Ride", "Drive", "Business", "Gift Cards", "Safety"],
  Support: ["Help Center", "Safety Guidelines", "Community", "Trust & Safety"],
  Legal: [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility",
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">R</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-20 blur-sm -z-10" />
              </div>
              <span className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RideShare
              </span>
            </div>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Making transportation accessible, affordable, and convenient for
              everyone.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                >
                  <Icon size={18} />
                </Button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* App download section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
            <div>
              <h3 className="text-2xl mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Download the App
              </h3>
              <p className="text-gray-400">
                Get the best ride-sharing experience
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-sm"
              >
                <Apple className="mr-2" size={20} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm">App Store</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-sm"
              >
                <Smartphone className="mr-2" size={20} />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>© 2025 RideShare. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
