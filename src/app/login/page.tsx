"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 relative bg-secondary">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale"
        >
          <source src="https://cdn.coverr.co/videos/coverr-walking-in-a-city-4361/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            LUXE.
          </Link>
          <div>
            <h2 className="text-4xl font-bold mb-4 max-w-md leading-tight">Elevate your digital wardrobe.</h2>
            <p className="text-white/80">Sign in to access your exclusive benefits and track your luxury orders.</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 relative">
        <Link href="/" className="absolute top-8 left-6 md:hidden flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-foreground/60">Enter your details to sign in to your account.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-md border border-input bg-transparent pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-colors" 
                  placeholder="name@example.com" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-foreground/60 hover:text-foreground">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-md border border-input bg-transparent pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-colors" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <Button size="lg" className="w-full h-12 rounded-md">
              Sign In
            </Button>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-foreground/50">Or continue with</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full h-12 gap-2" type="button">
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link href="/signup" className="text-foreground font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
