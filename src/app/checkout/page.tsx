"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, ShoppingBag, Truck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shipping = 0; // free shipping over 300, etc.
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success("Payment successful!");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-8 mx-auto"
        >
          <Check className="w-12 h-12" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Order Confirmed
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-foreground/60 max-w-md mx-auto mb-10 text-lg"
        >
          Thank you for shopping at LUXE. Your order #LX-{Math.floor(Math.random() * 100000)} is currently being processed.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/shop">
            <Button size="lg" variant="premium" className="rounded-full px-8">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Forms */}
          <div className="flex-1 space-y-8">
            {/* Steps indicator */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10" />
              {[
                { num: 1, label: "Shipping", icon: <Truck className="w-4 h-4" /> },
                { num: 2, label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
                { num: 3, label: "Review", icon: <ShoppingBag className="w-4 h-4" /> }
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step >= s.num ? "bg-foreground text-background" : "bg-secondary text-foreground/50"
                  }`}>
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-sm font-medium ${step >= s.num ? "text-foreground" : "text-foreground/50"}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="123 Luxury Ave" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Postal Code</label>
                      <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="10001" />
                    </div>
                  </div>
                  <Button size="lg" className="w-full mt-6" onClick={() => setStep(2)}>
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold">Payment Method</h2>
                  <div className="p-4 border border-primary rounded-lg bg-primary/5 flex items-start gap-4">
                    <input type="radio" checked readOnly className="mt-1" />
                    <div>
                      <p className="font-medium">Credit Card (Stripe Mock)</p>
                      <p className="text-sm text-foreground/60">Pay securely with your credit card.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring font-mono" placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring font-mono" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVC</label>
                        <input type="text" className="w-full h-12 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring font-mono" placeholder="123" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" size="lg" className="w-1/3" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button size="lg" className="w-2/3" onClick={() => setStep(3)}>
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold">Review Order</h2>
                  <div className="bg-secondary/30 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-start border-b border-border pb-4">
                      <div>
                        <p className="font-medium mb-1">Shipping To</p>
                        <p className="text-sm text-foreground/70">John Doe<br/>123 Luxury Ave<br/>New York, 10001</p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-sm text-primary underline">Edit</button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium mb-1">Payment Method</p>
                        <p className="text-sm text-foreground/70">Credit Card ending in 4242</p>
                      </div>
                      <button onClick={() => setStep(2)} className="text-sm text-primary underline">Edit</button>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    variant="premium" 
                    className="w-full h-14 mt-8" 
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-secondary/20 border border-border rounded-2xl p-6 sticky top-32">
              <h3 className="text-lg font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="relative w-16 h-20 rounded-md overflow-hidden bg-secondary shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-foreground/60 mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
