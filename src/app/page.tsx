"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { PRODUCTS } from "@/constants/products";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0] || "ONE SIZE"
    });
    toast.success(`${product.name} added to cart`, {
      icon: <ShoppingBag className="w-4 h-4" />
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
              alt="Hero Fashion"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </div>

        <div className="container relative z-20 px-6 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="uppercase tracking-[0.3em] text-xs font-semibold mb-6 block text-foreground/80">
              The New Collection
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            ELEVATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-800 dark:from-neutral-200 dark:to-neutral-600">
              YOUR STYLE
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 font-light"
          >
            Discover the epitome of modern luxury. Curated pieces designed for the bold and sophisticated.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="rounded-full px-12 text-md h-14 w-full sm:w-auto" asChild>
              <Link href="/shop">Shop Collection</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Trending Now</h2>
              <p className="text-foreground/60">The pieces everyone is talking about.</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 font-medium hover:text-foreground/70 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-10 gap-2 px-4">
                    <Button 
                      variant="secondary" 
                      className="w-12 h-12 rounded-full shadow-xl bg-background/90 backdrop-blur-sm p-0 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="premium" 
                      className="flex-1 rounded-full shadow-xl backdrop-blur-md"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <span className="font-semibold text-lg">${product.price}</span>
                </div>
                <p className="text-foreground/50 text-sm px-1">{product.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brand Values / Banner */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border border-background/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-background/70 leading-relaxed max-w-xs">Meticulously crafted with the finest materials for enduring elegance.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border border-background/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainable</h3>
              <p className="text-background/70 leading-relaxed max-w-xs">Ethically sourced and produced with minimal environmental impact.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border border-background/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Express Delivery</h3>
              <p className="text-background/70 leading-relaxed max-w-xs">Complimentary worldwide shipping on all premium orders.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </main>
  );
}
