"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/constants/products";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingBag, ChevronRight, Star, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SizeGuideModal } from "@/components/shop/SizeGuideModal";
import { RelatedProducts } from "@/components/shop/RelatedProducts";

export default function ProductPage() {
  const params = useParams();
  const product = PRODUCTS.find(p => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize
    });
    toast.success(`${product.name} added to cart`, {
      icon: <ShoppingBag className="w-4 h-4" />
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="relative aspect-[4/5] bg-secondary rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails placeholder */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative w-24 aspect-[4/5] bg-secondary rounded-lg overflow-hidden shrink-0 cursor-pointer border-2 border-transparent hover:border-foreground/20 transition-colors">
                   <Image
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    fill
                    className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4 uppercase tracking-wider">
              <span>{product.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold">${product.price}</span>
              <div className="flex items-center gap-1 text-sm text-foreground/60">
                <div className="flex text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-50" />
                </div>
                <span>(128 Reviews)</span>
              </div>
            </div>

            <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Size</span>
                <button 
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-sm text-foreground/60 underline underline-offset-4 hover:text-foreground"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border rounded-md flex items-center justify-center font-medium transition-colors ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-10">
              <Button 
                size="lg" 
                variant="premium" 
                className="w-full h-14 text-lg rounded-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>

            {/* Features list */}
            <div className="border-t border-border pt-8 space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <Truck className="w-5 h-5 text-foreground/60" />
                <span>Complimentary Express Shipping over $300</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <ShoppingBag className="w-5 h-5 text-foreground/60" />
                <span>Free Returns within 30 days</span>
              </div>
            </div>
          </motion.div>
        </div>

        <RelatedProducts products={PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 8)} />
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </main>
  );
}
