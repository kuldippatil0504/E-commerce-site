"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-background rounded-2xl shadow-2xl z-[111] overflow-hidden flex flex-col p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Size Guide</h2>
            <p className="text-foreground/60 text-center mb-8">
              Measurements are provided as a guide. Actual garment measurements may vary slightly.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 font-semibold text-foreground">Size</th>
                    <th className="py-4 font-semibold text-foreground">US</th>
                    <th className="py-4 font-semibold text-foreground">UK</th>
                    <th className="py-4 font-semibold text-foreground">EU</th>
                    <th className="py-4 font-semibold text-foreground">Chest (in)</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/70">
                  <tr className="border-b border-border/50">
                    <td className="py-4 font-medium text-foreground">S</td>
                    <td className="py-4">36</td>
                    <td className="py-4">36</td>
                    <td className="py-4">46</td>
                    <td className="py-4">35-37</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 font-medium text-foreground">M</td>
                    <td className="py-4">38</td>
                    <td className="py-4">38</td>
                    <td className="py-4">48</td>
                    <td className="py-4">38-40</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 font-medium text-foreground">L</td>
                    <td className="py-4">40</td>
                    <td className="py-4">40</td>
                    <td className="py-4">50</td>
                    <td className="py-4">41-43</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 font-medium text-foreground">XL</td>
                    <td className="py-4">42</td>
                    <td className="py-4">42</td>
                    <td className="py-4">52</td>
                    <td className="py-4">44-46</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center text-sm text-foreground/50">
              Still not sure? Contact our support team for personalized sizing advice.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
