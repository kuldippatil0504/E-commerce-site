"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { User, Package, Heart, Settings, LogOut, ShoppingBag, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const TABS = [
  { id: "orders", label: "Orders", icon: <Package className="w-4 h-4" /> },
  { id: "wishlist", label: "Wishlist", icon: <Heart className="w-4 h-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore();
  const addItemToCart = useCartStore(state => state.addItem);

  const handleMoveToCart = (product: any) => {
    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0] || "ONE SIZE"
    });
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <Navbar />
      <div className="container mx-auto px-6 pt-32 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
                JD
              </div>
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-foreground/60 text-sm">john.doe@example.com</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    activeTab === tab.id 
                      ? "bg-foreground text-background" 
                      : "hover:bg-secondary text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-[400px]">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-secondary/20 border border-border rounded-2xl p-8 h-full"
            >
              {activeTab === "orders" && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Recent Orders</h3>
                  <div className="space-y-4">
                    <div className="p-6 border border-border rounded-xl bg-background flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">Order #LX-84920</span>
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full font-medium">Delivered</span>
                        </div>
                        <p className="text-sm text-foreground/60">Placed on May 15, 2026 • 2 items</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className="font-bold text-lg">$798.00</span>
                        <Button variant="outline" size="sm" className="rounded-full">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Your Wishlist</h3>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12 text-foreground/60">
                      <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Your wishlist is currently empty.</p>
                      <Button variant="outline" className="mt-6 rounded-full" asChild>
                        <Link href="/shop">Explore Shop</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-border rounded-xl bg-background group">
                          <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-secondary shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex flex-col flex-1 py-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                <p className="text-sm text-foreground/60">{item.category}</p>
                              </div>
                              <span className="font-semibold">${item.price}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-auto">
                              <Button 
                                size="sm" 
                                variant="premium" 
                                className="flex-1 rounded-full h-8 text-xs"
                                onClick={() => handleMoveToCart(item)}
                              >
                                Move to Cart
                              </Button>
                              <button 
                                onClick={() => removeFromWishlist(item.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Account Settings</h3>
                  <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <input type="text" defaultValue="John Doe" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <input type="email" defaultValue="john.doe@example.com" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                    </div>
                    <Button className="mt-4 rounded-full">Save Changes</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
