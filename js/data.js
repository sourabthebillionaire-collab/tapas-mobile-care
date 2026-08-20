const products = [
    // Smartphones
    {
        id: 'p1',
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        category: 'Smartphones',
        price: '₹1,59,900',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Titanium design. A17 Pro chip. 48MP Main camera.',
        specs: ['6.7" Super Retina XDR', 'A17 Pro chip', '48MP Pro camera system', 'Titanium design'],
        features: 'The most advanced iPhone yet, featuring aerospace-grade titanium design and the blazing fast A17 Pro chip for next-level gaming and performance.',
        badge: 'New Arrival'
    },
    {
        id: 'p2',
        name: 'iPhone 15',
        brand: 'Apple',
        category: 'Smartphones',
        price: '₹79,900',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Dynamic Island. 48MP Main camera. USB-C.',
        specs: ['6.1" Super Retina XDR', 'A16 Bionic chip', '48MP Main camera', 'USB-C'],
        features: 'Experience the Dynamic Island and a massive leap in detail with the new 48MP main camera.',
        badge: 'Best Seller'
    },
    {
        id: 'p3',
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        category: 'Smartphones',
        price: '₹1,29,999',
        image: 'assets/images/s24_ultra.jpg',
        shortDesc: 'Galaxy AI. Titanium exterior. 200MP camera.',
        specs: ['6.8" QHD+ AMOLED', 'Snapdragon 8 Gen 3', '200MP Camera', 'Built-in S Pen'],
        features: 'Welcome to the era of mobile AI. Empower your everyday with epic new ways to create, connect and get things done.',
        badge: 'Premium'
    },
    {
        id: 'p4',
        name: 'Samsung Galaxy A55 5G',
        brand: 'Samsung',
        category: 'Smartphones',
        price: '₹39,999',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Awesome design. Awesome Nightography.',
        specs: ['6.6" FHD+ Super AMOLED', 'Exynos 1480', '50MP OIS Camera', '5000mAh Battery'],
        features: 'A premium glass design, exceptional low-light cameras, and long-lasting battery life make this a mid-range champion.',
        badge: ''
    },
    {
        id: 'p5',
        name: 'OnePlus 12',
        brand: 'OnePlus',
        category: 'Smartphones',
        price: '₹64,999',
        image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=800&auto=format&fit=crop', // generic premium android
        shortDesc: 'Smooth beyond belief. Hasselblad Camera.',
        specs: ['6.82" 2K ProXDR', 'Snapdragon 8 Gen 3', '4th Gen Hasselblad Camera', '100W Fast Charging'],
        features: 'Experience unparalleled smoothness with the latest Snapdragon processor and incredibly fast charging.',
        badge: ''
    },
    {
        id: 'p6',
        name: 'OnePlus Nord CE 4',
        brand: 'OnePlus',
        category: 'Smartphones',
        price: '₹24,999',
        image: 'assets/images/oneplus_nord.jpg',
        shortDesc: 'Fast and smooth performance for everyday use.',
        specs: ['6.7" Fluid AMOLED', 'Snapdragon 7 Gen 3', '50MP Sony Camera', '100W SUPERVOOC'],
        features: 'Delivering the signature OnePlus fast and smooth experience in an affordable package.',
        badge: 'Value'
    },
    {
        id: 'p7',
        name: 'OPPO Reno11 Pro 5G',
        brand: 'OPPO',
        category: 'Smartphones',
        price: '₹39,999',
        image: 'assets/images/oppo_reno.jpg',
        shortDesc: 'The Portrait Expert with ultra-slim design.',
        specs: ['6.7" 3D Curved AMOLED', 'MediaTek Dimensity 8200', '32MP Telephoto Portrait', '80W SUPERVOOC'],
        features: 'Capture studio-quality portraits with the dedicated telephoto lens and stand out with the elegant pearl design.',
        badge: ''
    },
    {
        id: 'p8',
        name: 'Vivo V30 Pro',
        brand: 'Vivo',
        category: 'Smartphones',
        price: '₹41,999',
        image: 'assets/images/vivo_v30.jpg',
        shortDesc: 'ZEISS Professional Portrait Camera.',
        specs: ['6.78" 1.5K AMOLED', 'Dimensity 8200', 'Triple 50MP ZEISS Cameras', 'Smart Aura Light'],
        features: 'Co-engineered with ZEISS to deliver professional-grade portraits and exceptional low-light performance with Aura Light 3.0.',
        badge: 'Camera Focus'
    },
    {
        id: 'p9',
        name: 'Realme 12 Pro+ 5G',
        brand: 'Realme',
        category: 'Smartphones',
        price: '₹29,999',
        image: 'assets/images/realme_12.jpg',
        shortDesc: 'Luxury watch design with Periscope Portrait.',
        specs: ['6.7" Curved Vision Display', 'Snapdragon 7s Gen 2', '64MP Periscope Portrait', 'Premium Vegan Leather'],
        features: 'Bringing flagship periscope camera technology and luxury vegan leather design to the mid-range segment.',
        badge: ''
    },
    {
        id: 'p10',
        name: 'Redmi Note 13 Pro+ 5G',
        brand: 'Xiaomi',
        category: 'Smartphones',
        price: '₹31,999',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
        shortDesc: '200MP OIS camera. 1.5K curved display.',
        specs: ['6.67" 3D Curved AMOLED', 'Dimensity 7200-Ultra', '200MP Ultra-High Res', 'IP68 Water Resistance'],
        features: 'Flagship-level durability with IP68 rating and an incredible 200MP camera for ultra-detailed shots.',
        badge: ''
    },
    
    // Laptops
    {
        id: 'p11',
        name: 'HP Pavilion 15',
        brand: 'HP',
        category: 'Laptops & Computers',
        price: '₹65,990',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Reliable performance for everyday tasks.',
        specs: ['15.6" FHD Display', 'Intel Core i5 12th Gen', '16GB RAM', '512GB SSD'],
        features: 'A versatile laptop perfect for students and professionals, offering reliable performance and a sleek design.',
        badge: 'Popular'
    },
    {
        id: 'p12',
        name: 'Dell Inspiron 14',
        brand: 'Dell',
        category: 'Laptops & Computers',
        price: '₹58,990',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Compact, capable, and connected.',
        specs: ['14.0" FHD+ Display', 'AMD Ryzen 5 7530U', '8GB RAM', '512GB SSD'],
        features: 'Highly portable 14-inch laptop with narrow borders and ample performance for daily productivity.',
        badge: ''
    },
    {
        id: 'p13',
        name: 'Lenovo IdeaPad Slim 3',
        brand: 'Lenovo',
        category: 'Laptops & Computers',
        price: '₹38,990',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Smart learning and lightweight design.',
        specs: ['15.6" FHD Display', 'Intel Core i3 13th Gen', '8GB RAM', '512GB SSD'],
        features: 'Designed for lightweight portability and tailored for smart learning with eye-care features.',
        badge: 'Value'
    },
    {
        id: 'p14',
        name: 'ASUS TUF Gaming F15',
        brand: 'ASUS',
        category: 'Laptops & Computers',
        price: '₹74,990',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Geared for serious gaming and durability.',
        specs: ['15.6" 144Hz FHD', 'Intel Core i5 11th Gen', 'RTX 3050 4GB', '16GB RAM'],
        features: 'Military-grade durability meets competitive gaming performance with a fast 144Hz refresh rate display.',
        badge: 'Gaming'
    },
    {
        id: 'p15',
        name: 'Acer Swift Go 14',
        brand: 'Acer',
        category: 'Laptops & Computers',
        price: '₹89,999',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Thin, light, and AI-ready.',
        specs: ['14" OLED Display', 'Intel Core Ultra 5', '16GB RAM', '512GB SSD'],
        features: 'A premium thin-and-light laptop featuring a stunning OLED display and the latest AI-enhanced Intel processors.',
        badge: ''
    },

    // Accessories
    {
        id: 'p16',
        name: 'Apple AirPods Pro (2nd Gen)',
        brand: 'Apple',
        category: 'Accessories',
        price: '₹24,900',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Pro-level Active Noise Cancellation.',
        specs: ['H2 Apple Silicon', 'Active Noise Cancellation', 'Adaptive Transparency', 'USB-C MagSafe Case'],
        features: 'Richer audio experience, next-level Active Noise Cancellation, and Adaptive Transparency reduce more external noise.',
        badge: 'Premium'
    },
    {
        id: 'p17',
        name: 'Samsung Galaxy Watch 6',
        brand: 'Samsung',
        category: 'Accessories',
        price: '₹29,999',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Advanced health monitoring and larger display.',
        specs: ['Sapphire Crystal Glass', 'Advanced Sleep Coaching', 'ECG & BP Monitoring', 'Wear OS'],
        features: 'Start your everyday wellness journey with sleep tracking, body composition analysis, and a slimmer bezel.',
        badge: ''
    },
    {
        id: 'p18',
        name: 'OnePlus Buds 3',
        brand: 'OnePlus',
        category: 'Accessories',
        price: '₹5,499',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Splendid audio, majestic silence.',
        specs: ['Dual Dynamic Drivers', '49dB Smart ANC', 'LHDC 5.0 Audio', '44h Battery Life'],
        features: 'High-resolution audio with dual drivers and powerful active noise cancellation for an immersive sound experience.',
        badge: ''
    },
    {
        id: 'p19',
        name: 'Realme Buds Air 5 Pro',
        brand: 'Realme',
        category: 'Accessories',
        price: '₹4,999',
        image: 'https://images.unsplash.com/photo-1606220588913-b3eea4ceb75a?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Real boost, clear voice.',
        specs: ['50dB Active Noise Cancellation', 'Coaxial Dual Drivers', '360° Spatial Audio', '40h Battery'],
        features: 'Flagship-level active noise cancellation and spatial audio at a highly competitive price point.',
        badge: 'Value'
    },
    {
        id: 'p20',
        name: 'Boat Stone 1000 Bluetooth Speaker',
        brand: 'Other',
        category: 'Accessories',
        price: '₹2,499',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop',
        shortDesc: 'Powerful 14W stereo sound with IPX5.',
        specs: ['14W Output', 'IPX5 Water Resistant', '8h Playback', 'Rugged Design'],
        features: 'Bring the party anywhere with this rugged, water-resistant bluetooth speaker delivering monstrous sound.',
        badge: ''
    }
];
