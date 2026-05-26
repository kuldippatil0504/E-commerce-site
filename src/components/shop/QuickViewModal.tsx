"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ShoppingBag, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/constants/products";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { toast } from "sonner";
import Link from "next/link";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const isWished = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWished) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist", {
        icon: <Heart className="w-4 h-4 fill-current text-red-500" />
      });
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize || product.sizes[0]
    });
    toast.success(`${product.name} added to cart`, {
      icon: <ShoppingBag className="w-4 h-4" />
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl bg-background rounded-2xl shadow-2xl z-[111] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/50 hover:bg-background rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="w-full md:w-1/2 relative bg-secondary h-[40vh] md:h-auto shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/60 uppercase tracking-wider">{product.category}</span>
                <button onClick={toggleWishlist} className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <Heart className={`w-5 h-5 transition-colors ${isWished ? 'fill-red-500 text-red-500' : 'text-foreground/50 hover:text-red-500'}`} />
                </button>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-semibold">${product.price}</span>
                <div className="flex items-center gap-1 text-sm text-foreground/60 border-l border-border pl-4">
                  <div className="flex text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current opacity-50" />
                  </div>
                  <span>(128)</span>
                </div>
              </div>

              <p className="text-foreground/70 mb-8 line-clamp-3">
                {product.description}
              </p>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Size</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 px-4 min-w-[3rem] border rounded-md flex items-center justify-center font-medium transition-colors ${
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

              <div className="flex flex-col gap-4 mt-auto">
                <Button 
                  size="lg" 
                  variant="premium" 
                  className="w-full rounded-full"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full rounded-full" asChild>
                  <Link href={`/shop/${product.id}`} onClick={onClose}>
                    View Full Details
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
