"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { PRODUCTS } from "@/constants/products";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <Navbar />
      <div className="container mx-auto px-6 pt-32">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Search</h1>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/50 group-focus-within:text-foreground transition-colors">
              <SearchIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, collections, or styles..."
              className="w-full h-14 pl-12 pr-12 rounded-full border border-border bg-secondary/50 focus:bg-background focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 outline-none transition-all text-lg"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex overflow-x-auto gap-3 pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm transition-all border ${
                  activeCategory === category 
                    ? "border-foreground bg-foreground text-background" 
                    : "border-border hover:border-foreground/30 bg-transparent text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="w-full md:w-auto text-sm text-foreground/60 flex justify-between items-center">
            <span>{filteredProducts.length} results</span>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                >
                  <Link href={`/shop/${product.id}`} className="group flex flex-col h-full">
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4 rounded-xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>
                    <div className="flex justify-between items-start mt-auto">
                      <div>
                        <h3 className="font-medium text-lg leading-tight mb-1">{product.name}</h3>
                        <p className="text-foreground/50 text-sm">{product.category}</p>
                      </div>
                      <span className="font-semibold text-lg">${product.price}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-foreground/30">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-medium mb-2">No results found</h3>
            <p className="text-foreground/60 max-w-md">
              We couldn't find any products matching your current search criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              variant="outline" 
              className="mt-8 rounded-full"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
