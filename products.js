// ============================================================
// DREAM POINT - এই ফাইলটাই আপনার দোকানের "খাতা"
// নতুন প্রোডাক্ট যোগ করতে: নিচের যেকোনো একটা { ... } ব্লক কপি করে
// তার নিচে পেস্ট করুন, শেষে কমা (,) দিন, তারপর তথ্য বদলান।
// প্রোডাক্ট মুছতে: পুরো { ... }, ব্লকটা মুছে দিন।
// ============================================================

const WHATSAPP = "8801623051851";   // + ছাড়া, দেশের কোডসহ

// ছবি: ছবির ফাইলটা "images" ফোল্ডারে রাখুন, তারপর নাম লিখুন। যেমন "images/panjabi1.jpg"
// ছবি না দিলে একটা ফাঁকা ঘর দেখাবে।
const CATEGORIES = [
  { name: "Panjabi",  image: "" },
  { name: "Sweater",  image: "" },
  { name: "T-Shirt",  image: "" },
  { name: "Combo",    image: "" },
  { name: "Hoodie",   image: "" },
  { name: "Jacket",   image: "" },
  { name: "Shirt",    image: "" }
];

// demo: true মানে এটা নমুনা। আসল প্রোডাক্ট দিলে demo: false করুন (বা লাইনটা মুছুন)।
// discountPrice: ছাড়ের দাম। না থাকলে null।
// stock: true = আছে, false = শেষ।
// images: একাধিক ছবি দিতে চাইলে ["images/a.jpg", "images/b.jpg"]
const PRODUCTS = [
  { id: 1, demo: true, name: "Classic Cotton Panjabi", category: "Panjabi",
    description: "Soft cotton panjabi for everyday and occasion wear.",
    price: 1000, discountPrice: null, image: "", images: [],
    sizes: ["M", "L", "XL"], colors: ["White", "Black"],
    stock: true, featured: true, newArrival: true },

  { id: 2, demo: true, name: "Warm Knit Sweater", category: "Sweater",
    description: "Warm knit sweater for the winter season.",
    price: 1000, discountPrice: 900, image: "", images: [],
    sizes: ["M", "L", "XL"], colors: ["Navy", "Maroon"],
    stock: true, featured: true, newArrival: true },

  { id: 3, demo: true, name: "Everyday T-Shirt", category: "T-Shirt",
    description: "Comfortable regular-fit t-shirt.",
    price: 1000, discountPrice: null, image: "", images: [],
    sizes: ["S", "M", "L", "XL"], colors: ["Black", "White", "Grey"],
    stock: true, featured: false, newArrival: true },

  { id: 4, demo: true, name: "Panjabi + Pajama Combo", category: "Combo",
    description: "Matching panjabi and pajama set.",
    price: 1000, discountPrice: null, image: "", images: [],
    sizes: ["M", "L", "XL"], colors: ["Cream"],
    stock: true, featured: true, newArrival: false },

  { id: 5, name: "Colour Block Hoodie", category: "Hoodie",
    description: "Olive green, black and beige colour-block hoodie with drawstring hood and front pocket.",
    price: 990, discountPrice: null, image: "images/hoodie-olive.jpg", images: [],
    sizes: ["M", "L", "XL"], colors: ["Olive Green"],
    stock: true, featured: true, newArrival: true },

  { id: 6, demo: true, name: "Light Winter Jacket", category: "Jacket",
    description: "Light jacket for cool evenings.",
    price: 1000, discountPrice: null, image: "", images: [],
    sizes: ["M", "L", "XL"], colors: ["Olive", "Black"],
    stock: false, featured: false, newArrival: false },

  { id: 7, demo: true, name: "Denim Shirt", category: "Shirt",
    description: "Premium quality denim shirt.",
    price: 1000, discountPrice: null, image: "", images: [],
    sizes: ["M", "L", "XL"], colors: ["Blue"],
    stock: true, featured: false, newArrival: true },

  { id: 8, demo: true, name: "Embroidered Panjabi", category: "Panjabi",
    description: "Panjabi with simple embroidery on the collar.",
    price: 1000, discountPrice: 950, image: "", images: [],
    sizes: ["M", "L", "XL"], colors: ["Beige", "Black"],
    stock: true, featured: false, newArrival: false }
];
