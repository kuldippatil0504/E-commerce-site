"use client";

import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <Navbar />
      <div className="container mx-auto px-6 pt-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">About LUXE.</h1>
          
          <div className="relative aspect-video w-full mb-12 rounded-2xl overflow-hidden bg-secondary">
            <Image 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
              alt="LUXE Storefront"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-8 text-lg text-foreground/80 leading-relaxed font-light">
            <p>
              Welcome to LUXE, where we redefine modern luxury. Our mission is to provide you with the most premium and carefully curated pieces, crafted with the finest materials for enduring elegance.
            </p>
            <p>
              We believe that style is a reflection of individuality. Our collections are designed for the bold, the sophisticated, and those who appreciate the subtle nuances of high-end fashion. From the initial sketch to the final stitch, every piece tells a story of dedication to the craft.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-border my-12">
              <div>
                <h3 className="text-xl font-medium mb-4 text-foreground">Our Vision</h3>
                <p className="text-base text-foreground/70">To inspire confidence through meticulously designed garments that stand the test of time, both in style and durability.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-foreground">Sustainability</h3>
                <p className="text-base text-foreground/70">Sustainability and ethical practices are at the heart of our brand. We are committed to minimizing our environmental footprint.</p>
              </div>
            </div>
            <p>
              Thank you for being part of the LUXE journey. We invite you to explore our collections and discover the epitome of modern luxury.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
