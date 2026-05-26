"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast.success("Subscribed to the newsletter!", {
      description: "You'll be the first to know about our latest collections.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-secondary/30 pt-24 pb-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter mb-6 block">
              LUXE.
            </Link>
            <p className="text-foreground/60 max-w-sm mb-8 leading-relaxed">
              Redefining modern luxury with meticulously crafted pieces designed for the bold and sophisticated.
            </p>
            <form onSubmit={handleSubscribe} className="relative max-w-md flex">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe to our newsletter" 
                className="w-full h-12 bg-transparent border-b border-foreground/20 focus:border-foreground outline-none transition-colors pr-12"
              />
              <button type="submit" className="absolute right-0 bottom-3 text-foreground/50 hover:text-foreground transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Shop</h4>
            <ul className="space-y-4 text-foreground/60">
              <li><Link href="/shop?category=Outerwear" className="hover:text-foreground transition-colors">Outerwear</Link></li>
              <li><Link href="/shop?category=Tops" className="hover:text-foreground transition-colors">Tops</Link></li>
              <li><Link href="/shop?category=Bottoms" className="hover:text-foreground transition-colors">Bottoms</Link></li>
              <li><Link href="/shop?category=Shoes" className="hover:text-foreground transition-colors">Shoes</Link></li>
              <li><Link href="/shop?category=Accessories" className="hover:text-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-foreground/60">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-foreground/50">
            <a href="#" className="hover:text-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
