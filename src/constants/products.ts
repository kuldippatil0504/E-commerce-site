export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  image: string;
  description: string;
  sizes: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "p_1",
    name: "Minimalist Coat",
    price: 499,
    category: "Outerwear",
    gender: "Men",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
    description: "A sleek, minimalist coat designed for the modern individual.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p_2",
    name: "Silk Blouse",
    price: 299,
    category: "Tops",
    gender: "Women",
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1974&auto=format&fit=crop",
    description: "Premium silk blouse perfect for both casual and formal occasions.",
    sizes: ["XS", "S", "M"]
  },
  {
    id: "p_3",
    name: "Leather Tote",
    price: 899,
    category: "Accessories",
    gender: "Women",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1976&auto=format&fit=crop",
    description: "Handcrafted leather tote bag with elegant detailing.",
    sizes: ["ONE SIZE"]
  },
  {
    id: "p_4",
    name: "Wool Trousers",
    price: 349,
    category: "Bottoms",
    gender: "Men",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
    description: "Tailored wool trousers for a sharp, sophisticated look.",
    sizes: ["30", "32", "34", "36"]
  },
  {
    id: "p_5",
    name: "Cashmere Sweater",
    price: 399,
    category: "Outerwear",
    gender: "Women",
    image: "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?q=80&w=1974&auto=format&fit=crop",
    description: "Luxurious cashmere sweater, soft and warm.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p_6",
    name: "Signature Loafers",
    price: 549,
    category: "Shoes",
    gender: "Men",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1974&auto=format&fit=crop",
    description: "Timeless signature loafers made from premium Italian leather.",
    sizes: ["8", "9", "10", "11"]
  },
  {
    id: "p_7",
    name: "Structured Blazer",
    price: 599,
    category: "Outerwear",
    gender: "Women",
    image: "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=1974&auto=format&fit=crop",
    description: "A highly structured blazer to elevate your office wear or evening look.",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "p_8",
    name: "Classic White Tee",
    price: 89,
    category: "Tops",
    gender: "Unisex",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    description: "The perfect classic white tee, crafted from heavy-weight organic cotton.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "p_9",
    name: "Aviator Sunglasses",
    price: 249,
    category: "Accessories",
    gender: "Unisex",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
    description: "Timeless aviator sunglasses with polarized lenses and gold accents.",
    sizes: ["ONE SIZE"]
  },
  {
    id: "p_10",
    name: "Pleated Skirt",
    price: 289,
    category: "Bottoms",
    gender: "Women",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1964&auto=format&fit=crop",
    description: "Flowy pleated skirt that moves beautifully with every step.",
    sizes: ["XS", "S", "M", "L"]
  }
];
