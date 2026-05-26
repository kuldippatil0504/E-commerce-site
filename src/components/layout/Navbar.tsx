"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Search, Menu, X, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "@/components/cart/CartDrawer";

function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || itemCount === 0) return null;

  return (
    <motion.span 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 bg-black text-white dark:bg-white dark:text-black w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold"
    >
      {itemCount}
    </motion.span>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-white/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              LUXE.
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/shop" className="hover:text-primary/70 transition-colors">
                Shop
              </Link>
              <Link href="/collections" className="hover:text-primary/70 transition-colors">
                Collections
              </Link>
              <Link href="/about" className="hover:text-primary/70 transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search" className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/profile" className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/profile" className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
            <ThemeToggle />
            <button 
              className="p-2 hover:bg-accent rounded-full transition-colors relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              <CartBadge />
            </button>
            
            <button 
              className="p-2 hover:bg-accent rounded-full transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link href="/shop" className="text-lg font-medium hover:text-primary/70 transition-colors">
                Shop
              </Link>
              <Link href="/collections" className="text-lg font-medium hover:text-primary/70 transition-colors">
                Collections
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-primary/70 transition-colors">
                About
              </Link>
              <div className="h-px bg-border my-2" />
              <Link href="/profile" className="text-lg font-medium hover:text-primary/70 transition-colors">
                Profile
              </Link>
            </div>
          </motion.div>
        )}
      </motion.header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
