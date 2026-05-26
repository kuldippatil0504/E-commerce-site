"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    id: "essentials",
    title: "The Essentials",
    description: "Everyday luxury basics crafted for longevity.",
    image: "https://images.unsplash.com/photo-1434389678369-182cb14f1797?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: "fw24",
    title: "Fall/Winter '24",
    description: "Embrace the cold with our new seasonal pieces.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "leather",
    title: "Leather Heritage",
    description: "Premium handcrafted leather goods.",
    image: "https://images.unsplash.com/photo-1548883354-94cb0b230f6a?q=80&w=2028&auto=format&fit=crop"
  }
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <Navbar />
      <div className="container mx-auto px-6 pt-32">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Collections</h1>
          <p className="text-foreground/60 max-w-xl text-lg">
            Discover our carefully curated collections, each telling a unique story of design and craftsmanship.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {COLLECTIONS.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
            >
              <div className="w-full md:w-1/2">
                <Link href={`/shop?collection=${collection.id}`} className="block group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </Link>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="uppercase tracking-[0.2em] text-xs font-semibold mb-4 text-foreground/50">
                  Collection
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{collection.title}</h2>
                <p className="text-foreground/70 text-lg mb-8 leading-relaxed max-w-md">
                  {collection.description}
                </p>
                <Link href={`/shop?collection=${collection.id}`} className="inline-flex items-center gap-2 font-medium hover:text-foreground/70 transition-colors w-fit group">
                  <span className="border-b border-transparent group-hover:border-foreground/70 transition-colors">Explore Collection</span> 
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
