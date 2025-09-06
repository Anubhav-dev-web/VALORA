// Sample product data for the luxury e-commerce site
const products = {
  watches: [
    {
      id: 'w1',
      name: 'Submariner Date',
      brand: 'rolex',
      price: 8500,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The Rolex Submariner Date is a legendary diving watch, combining functionality with timeless elegance.',
      category: 'watches',
      featured: true,
    },
    {
      id: 'w2',
      name: 'Speedmaster Professional',
      brand: 'omega',
      price: 3200,
      image:
        'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The legendary moonwatch, worn by astronauts and admired by watch enthusiasts worldwide.',
      category: 'watches',
      featured: false,
    },
    {
      id: 'w3',
      name: 'Nautilus 5711',
      brand: 'patek',
      price: 45000,
      image:
        'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'An iconic sports luxury watch that represents the pinnacle of Swiss watchmaking excellence.',
      category: 'watches',
      featured: true,
    },
    {
      id: 'w4',
      name: 'Tank Must',
      brand: 'cartier',
      price: 2800,
      image:
        'https://images.unsplash.com/photo-1581063683670-6df2247f1d8e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        "A timeless rectangular watch that embodies Cartier's design philosophy of refined elegance.",
      category: 'watches',
      featured: false,
    },
  ],

  shoes: [
    {
      id: 's1',
      name: 'So Kate 120',
      brand: 'louboutin',
      price: 795,
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The iconic red-soled pump that epitomizes feminine sophistication and glamour.',
      category: 'shoes',
      featured: true,
    },
    {
      id: 's2',
      name: 'Bing 100',
      brand: 'jimmy-choo',
      price: 650,
      image:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'Elegant pointed-toe pumps crafted from premium leather with signature Jimmy Choo styling.',
      category: 'shoes',
      featured: false,
    },
    {
      id: 's3',
      name: 'Hangisi 105',
      brand: 'manolo',
      price: 965,
      image:
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The iconic pump with crystal buckle that became famous after appearing in popular culture.',
      category: 'shoes',
      featured: true,
    },
    {
      id: 's4',
      name: 'Ace Sneakers',
      brand: 'gucci',
      price: 590,
      image:
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'Luxury leather sneakers featuring the signature Gucci stripe and modern Italian craftsmanship.',
      category: 'shoes',
      featured: false,
    },
  ],

  glasses: [
    {
      id: 'g1',
      name: 'Aviator Classic',
      brand: 'ray-ban',
      price: 165,
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The timeless aviator sunglasses that started it all, featuring premium lenses and iconic design.',
      category: 'glasses',
      featured: true,
    },
    {
      id: 'g2',
      name: 'Sutro',
      brand: 'oakley',
      price: 195,
      image:
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'Performance sunglasses with a bold, modern design and cutting-edge lens technology.',
      category: 'glasses',
      featured: false,
    },
    {
      id: 'g3',
      name: 'Cat Eye Frames',
      brand: 'prada',
      price: 320,
      image:
        'https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'Sophisticated cat-eye frames that blend vintage inspiration with contemporary luxury.',
      category: 'glasses',
      featured: false,
    },
    {
      id: 'g4',
      name: 'Tom Ford FT5178',
      brand: 'tom-ford',
      price: 420,
      image:
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'Luxury eyewear that combines impeccable design with superior quality and comfort.',
      category: 'glasses',
      featured: true,
    },
  ],

  bags: [
    {
      id: 'b1',
      name: 'Neverfull MM',
      brand: 'louis-vuitton',
      price: 1570,
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The iconic tote bag featuring the classic monogram canvas and spacious interior.',
      category: 'bags',
      featured: true,
    },
    {
      id: 'b2',
      name: 'Classic Flap Bag',
      brand: 'chanel',
      price: 8800,
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The quintessential Chanel handbag with quilted leather and the iconic CC closure.',
      category: 'bags',
      featured: true,
    },
    {
      id: 'b3',
      name: 'Birkin 35',
      brand: 'hermes',
      price: 15000,
      image:
        'https://images.unsplash.com/photo-1614179689702-355944cd0918?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'The most coveted handbag in the world, handcrafted from the finest leather.',
      category: 'bags',
      featured: true,
    },
    {
      id: 'b4',
      name: 'Saffiano Tote',
      brand: 'prada',
      price: 2300,
      image:
        'https://images.unsplash.com/photo-1727691038583-bd59f477bb4f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Elegant tote bag in signature Saffiano leather with clean lines and modern appeal.',
      category: 'bags',
      featured: false,
    },
  ],

  accessories: [
    {
      id: 'a1',
      name: 'Return to Tiffany Necklace',
      brand: 'tiffany',
      price: 325,
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'Sterling silver necklace featuring the iconic heart tag with Tiffany blue enamel.',
      category: 'accessories',
      featured: true,
    },
    {
      id: 'a2',
      name: 'Serpenti Bracelet',
      brand: 'bulgari',
      price: 1200,
      image:
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        '18k gold bracelet inspired by the serpent, a symbol of wisdom and vitality.',
      category: 'accessories',
      featured: true,
    },
    {
      id: 'a3',
      name: 'Love Bracelet',
      brand: 'cartier',
      price: 6750,
      image:
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'The iconic bracelet that symbolizes unbreakable love, crafted in 18k gold.',
      category: 'accessories',
      featured: true,
    },
    {
      id: 'a4',
      name: 'Alhambra Necklace',
      brand: 'van-cleef',
      price: 3850,
      image:
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description:
        'Delicate clover motif necklace in mother-of-pearl and yellow gold.',
      category: 'accessories',
      featured: false,
    },
  ],
};

// Brand display names
const brandNames = {
  rolex: 'Rolex',
  omega: 'Omega',
  patek: 'Patek Philippe',
  cartier: 'Cartier',
  louboutin: 'Christian Louboutin',
  'jimmy-choo': 'Jimmy Choo',
  manolo: 'Manolo Blahnik',
  gucci: 'Gucci',
  'ray-ban': 'Ray-Ban',
  oakley: 'Oakley',
  prada: 'Prada',
  'tom-ford': 'Tom Ford',
  'louis-vuitton': 'Louis Vuitton',
  chanel: 'Chanel',
  hermes: 'Hermès',
  tiffany: 'Tiffany & Co.',
  bulgari: 'Bulgari',
  'van-cleef': 'Van Cleef & Arpels',
  montblanc: 'Montblanc',
};

// Get all products
function getAllProducts() {
  return Object.values(products).flat();
}

// Get products by category
function getProductsByCategory(category) {
  return products[category] || [];
}

// Get featured products
function getFeaturedProducts() {
  return getAllProducts().filter((product) => product.featured);
}

// Get product by ID
function getProductById(id) {
  return getAllProducts().find((product) => product.id === id);
}

// Get brand display name
function getBrandDisplayName(brand) {
  return brandNames[brand] || brand;
}

// Filter products by price range
function filterByPrice(productList, priceRange) {
  if (!priceRange) return productList;

  const [min, max] = priceRange.split('-').map((p) => p.replace('+', ''));
  const minPrice = parseInt(min);
  const maxPrice = max ? parseInt(max) : Infinity;

  return productList.filter(
    (product) =>
      product.price >= minPrice &&
      (maxPrice === Infinity || product.price <= maxPrice)
  );
}

// Filter products by brand
function filterByBrand(productList, brand) {
  if (!brand) return productList;
  return productList.filter((product) => product.brand === brand);
}

// Sort products
function sortProducts(productList, sortBy) {
  const sorted = [...productList];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

// Format price
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

const featuredProducts = [
  {
    id: 'fp001',
    name: 'Submariner Date',
    brand: 'rolex',
    category: 'watches',
    price: 8500,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'The Rolex Submariner Date is a legendary diving watch, combining functionality with timeless elegance.',
    isFeatured: true,
  },
  {
    id: 'fp002',
    name: 'Speedmaster Professional',
    brand: 'omega',
    category: 'watches',
    price: 3200,
    image:
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'The legendary moonwatch, worn by astronauts and admired by watch enthusiasts worldwide.',
    isFeatured: true,
  },
  {
    id: 'fp003',
    name: 'Nautilus 5711',
    brand: 'patek',
    category: 'watches',
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'An iconic sports luxury watch that represents the pinnacle of Swiss watchmaking excellence.',
    isFeatured: true,
  },
  {
    id: 'fp004',
    name: 'So Kate 120',
    brand: 'louboutin',
    category: 'shoes',
    price: 795,
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'The iconic red-soled pump that epitomizes feminine sophistication and glamour.',
    isFeatured: true,
  },
  {
    id: 'fp005',
    name: 'Classic Flap Bag',
    brand: 'chanel',
    category: 'bags',
    price: 8800,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'The quintessential Chanel handbag with quilted leather and the iconic CC closure.',
    isFeatured: true,
  },
];
