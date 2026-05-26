"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/constants/products";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingBag, Filter, Eye } from "lucide-react";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

const CATEGORIES = ["All", "Outerwear", "Tops", "Bottoms", "Shoes", "Accessories"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const genderFilter = searchParams.get("gender");
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  let filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (genderFilter) {
    filteredProducts = filteredProducts.filter(p => p.gender === genderFilter || p.gender === "Unisex");
  }

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0] // default size
    });
    toast.success(`${product.name} added to cart`, {
      icon: <ShoppingBag className="w-4 h-4" />
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Collection</h1>
            <p className="text-foreground/60 max-w-xl">
              Explore our curated selection of premium pieces, designed for the modern aesthetic.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 flex items-center gap-2">
            <Button variant="outline" className="gap-2 rounded-full hidden sm:flex">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto gap-4 mb-12 pb-4 scrollbar-hide">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === category 
                  ? "bg-foreground text-background font-medium" 
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.a
                href={`/shop/${product.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4 rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  
                  {/* Hover Add to Cart Button */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-10 gap-2 px-4">
                    <Button 
                      variant="secondary" 
                      className="w-12 h-12 rounded-full shadow-xl bg-background/90 backdrop-blur-sm p-0 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickViewProduct(product);
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="premium" 
                      className="flex-1 rounded-full shadow-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      Quick Add
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg leading-tight mb-1">{product.name}</h3>
                    <p className="text-foreground/50 text-sm">{product.category}</p>
                  </div>
                  <span className="font-semibold text-lg">${product.price}</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-medium mb-2">No products found</h3>
            <p className="text-foreground/60">Try selecting a different category.</p>
          </div>
        )}
      </div>

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
