// Common JS for Tapas Mobile Care

const tailwindConfig = {
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            colors: {
                primary: '#09090b', // Zinc 950 - Very dark charcoal
                secondary: '#52525b', // Zinc 600
                accent: '#2563eb', // Blue 600
                brand: '#25D366', // WhatsApp
                brandHover: '#1DA851',
                surface: '#ffffff',
                background: '#f4f4f5', // Zinc 100
            }
        }
    }
};

// --- Cart Logic ---
let cart = JSON.parse(localStorage.getItem('tapas_cart')) || [];

function saveCart() {
    localStorage.setItem('tapas_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId) {
    if(typeof products === 'undefined') return;
    const product = products.find(p => p.id === productId);
    if(product) {
        const existing = cart.find(item => item.id === productId);
        if(existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        saveCart();
        showToast(`Added ${product.name} to cart!`);
        openCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const mobileCountEl = document.getElementById('mobile-cart-count');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    
    if(countEl) countEl.textContent = totalQty;
    if(mobileCountEl) mobileCountEl.textContent = totalQty;

    const cartItemsContainer = document.getElementById('cart-items');
    if(!cartItemsContainer) return;

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-secondary opacity-70">
                <i class="fas fa-shopping-bag text-5xl mb-4"></i>
                <p>Your cart is empty.</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex gap-4 border-b border-gray-100 py-4">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg bg-gray-50 border border-gray-100">
                <div class="flex-grow">
                    <h5 class="font-bold text-primary text-sm line-clamp-1">${item.name}</h5>
                    <p class="text-xs text-secondary mb-2">${item.price}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Qty: ${item.qty}</span>
                        <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 text-xs font-semibold"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function openCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if(sidebar && overlay) {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    }
}

function closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if(sidebar && overlay) {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }
}

function checkout() {
    if(cart.length === 0) return;
    let message = "Hello Tapas Mobile Care, I would like to purchase the following items from my cart:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} (Qty: ${item.qty})\n`;
    });
    message += "\nPlease share the total price and payment details.";
    window.open(`https://wa.me/918018048111?text=${encodeURIComponent(message)}`, '_blank');
    cart = [];
    saveCart();
    closeCart();
}

// --- Toast Notification ---
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-2xl z-[100] font-medium text-sm transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 border border-gray-700';
    toast.innerHTML = `<i class="fas fa-check-circle text-brand"></i> ${msg}`;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    
    // Animate out
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- App Shell Injection (Fixes 3-line bug everywhere) ---
function renderAppShell() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    const navHtml = `
    <!-- Header Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex-shrink-0 flex items-center">
                    <a href="index.html" class="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
                        <i class="fas fa-mobile text-accent"></i> Tapas<span class="text-accent">Mobile</span>Care
                    </a>
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden lg:flex items-center space-x-8">
                    <a href="index.html" class="${currentPath === 'index.html' ? 'text-accent font-bold' : 'text-secondary hover:text-primary font-medium'} transition-colors">Home</a>
                    <a href="products.html" class="${currentPath === 'products.html' ? 'text-accent font-bold' : 'text-secondary hover:text-primary font-medium'} transition-colors">Products</a>
                    <a href="mobiles.html" class="${currentPath === 'mobiles.html' ? 'text-accent font-bold' : 'text-secondary hover:text-primary font-medium'} transition-colors">Mobiles</a>
                    <a href="laptops.html" class="${currentPath === 'laptops.html' ? 'text-accent font-bold' : 'text-secondary hover:text-primary font-medium'} transition-colors">Laptops</a>
                    <a href="offers.html" class="${currentPath === 'offers.html' ? 'text-accent font-bold' : 'text-secondary hover:text-primary font-medium'} transition-colors">Offers</a>
                    <a href="about.html" class="${currentPath === 'about.html' ? 'text-accent font-bold' : 'text-secondary hover:text-primary font-medium'} transition-colors">Reviews</a>
                    <a href="contact.html" class="${currentPath === 'contact.html' ? 'text-accent font-bold' : 'text-secondary hover:text-primary font-medium'} transition-colors">Contact</a>
                </div>

                <!-- Desktop Actions -->
                <div class="hidden lg:flex items-center gap-4">
                    <button onclick="openCart()" class="relative text-primary hover:text-accent transition-colors p-2">
                        <i class="fas fa-shopping-cart text-xl"></i>
                        <span id="cart-count" class="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </button>
                    <a href="https://wa.me/918018048111" target="_blank" class="bg-primary hover:bg-black text-white px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg">
                        <i class="fab fa-whatsapp text-brand"></i> Contact Us
                    </a>
                </div>

                <!-- Mobile Actions (3-line menu fix) -->
                <div class="lg:hidden flex items-center gap-4">
                    <button onclick="openCart()" class="relative text-primary p-2">
                        <i class="fas fa-shopping-cart text-xl"></i>
                        <span id="mobile-cart-count" class="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </button>
                    <button id="mobile-menu-btn" class="text-primary focus:outline-none p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Drawer (Now present on EVERY page) -->
        <div id="mobile-menu" class="hidden bg-white border-t border-gray-100 shadow-2xl absolute w-full left-0 z-40 max-h-[80vh] overflow-y-auto">
            <div class="px-4 py-4 space-y-2">
                <a href="index.html" class="block px-4 py-3 text-base font-bold text-primary hover:bg-gray-50 rounded-xl"><i class="fas fa-home w-6 text-center text-gray-400 mr-2"></i> Home</a>
                <a href="products.html" class="block px-4 py-3 text-base font-bold text-primary hover:bg-gray-50 rounded-xl"><i class="fas fa-box w-6 text-center text-gray-400 mr-2"></i> Products</a>
                <a href="mobiles.html" class="block px-4 py-3 text-base font-bold text-primary hover:bg-gray-50 rounded-xl"><i class="fas fa-mobile-alt w-6 text-center text-gray-400 mr-2"></i> Mobiles</a>
                <a href="laptops.html" class="block px-4 py-3 text-base font-bold text-primary hover:bg-gray-50 rounded-xl"><i class="fas fa-laptop w-6 text-center text-gray-400 mr-2"></i> Laptops</a>
                <a href="offers.html" class="block px-4 py-3 text-base font-bold text-primary hover:bg-gray-50 rounded-xl"><i class="fas fa-fire w-6 text-center text-gray-400 mr-2"></i> Offers</a>
                <a href="about.html" class="block px-4 py-3 text-base font-bold text-primary hover:bg-gray-50 rounded-xl"><i class="fas fa-star w-6 text-center text-gray-400 mr-2"></i> Happy Customers</a>
                <a href="contact.html" class="block px-4 py-3 text-base font-bold text-primary hover:bg-gray-50 rounded-xl"><i class="fas fa-envelope w-6 text-center text-gray-400 mr-2"></i> Contact</a>
                <a href="https://wa.me/918018048111" target="_blank" class="flex justify-center items-center gap-2 mt-4 bg-brand text-white px-4 py-3.5 rounded-xl font-bold shadow-md">
                    <i class="fab fa-whatsapp text-xl"></i> WhatsApp Inquiry
                </a>
            </div>
        </div>
    </nav>
    
    <!-- Cart Sidebar Overlay -->
    <div id="cart-overlay" onclick="closeCart()" class="fixed inset-0 bg-black/50 z-50 hidden backdrop-blur-sm transition-opacity"></div>
    
    <!-- Cart Sidebar -->
    <div id="cart-sidebar" class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform translate-x-full transition-transform duration-300 shadow-2xl flex flex-col border-l border-gray-100">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 class="text-xl font-bold text-primary"><i class="fas fa-shopping-cart text-accent mr-2"></i> Your Cart</h2>
            <button onclick="closeCart()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-black transition-colors">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div id="cart-items" class="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
            <!-- Items injected here -->
        </div>
        <div class="p-6 border-t border-gray-100 bg-gray-50">
            <p class="text-xs text-secondary mb-4 text-center">Checkout is processed securely via WhatsApp.</p>
            <button onclick="checkout()" class="w-full bg-primary hover:bg-black text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/20">
                Proceed to Checkout <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    </div>
    
    <!-- Floating Social Icons -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a href="https://www.instagram.com/tapas_mobile_care" target="_blank" class="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white" title="Follow us on Instagram">
            <i class="fab fa-instagram text-3xl"></i>
        </a>
        <a href="https://wa.me/918018048111" target="_blank" class="bg-brand text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white" title="Chat on WhatsApp">
            <i class="fab fa-whatsapp text-3xl"></i>
        </a>
    </div>
    `;

    const footerHtml = `
    <!-- Ultra Premium Footer -->
    <footer class="bg-primary pt-20 pb-10 text-white border-t-4 border-accent">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div class="lg:col-span-2">
                    <a href="index.html" class="text-3xl font-black tracking-tight text-white mb-6 block flex items-center gap-2">
                        <i class="fas fa-mobile text-accent"></i> Tapas<span class="text-accent">Mobile</span>Care
                    </a>
                    <p class="text-gray-400 mb-8 max-w-sm leading-relaxed text-sm">
                        Odisha's No.1 Premium Technology Showroom. Experience the best in smartphones, laptops, and smart accessories with unmatched service.
                    </p>
                    <div class="flex gap-4">
                        <a href="https://www.instagram.com/tapas_mobile_care" target="_blank" class="w-12 h-12 rounded-full bg-white/5 hover:bg-pink-600 flex items-center justify-center transition-colors border border-white/10">
                            <i class="fab fa-instagram text-lg"></i>
                        </a>
                        <a href="https://wa.me/918018048111" target="_blank" class="w-12 h-12 rounded-full bg-white/5 hover:bg-brand flex items-center justify-center transition-colors border border-white/10">
                            <i class="fab fa-whatsapp text-lg"></i>
                        </a>
                        <a href="contact.html" class="w-12 h-12 rounded-full bg-white/5 hover:bg-accent flex items-center justify-center transition-colors border border-white/10">
                            <i class="fas fa-envelope text-lg"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold mb-6 text-lg tracking-wider">STORE</h4>
                    <ul class="space-y-4 text-gray-400 text-sm font-medium">
                        <li><a href="products.html" class="hover:text-accent transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i> All Products</a></li>
                        <li><a href="mobiles.html" class="hover:text-accent transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i> Smartphones</a></li>
                        <li><a href="laptops.html" class="hover:text-accent transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i> Laptops</a></li>
                        <li><a href="offers.html" class="hover:text-accent transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i> Special Offers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-6 text-lg tracking-wider">CONTACT</h4>
                    <ul class="space-y-4 text-gray-400 text-sm">
                        <li class="flex items-start gap-3">
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-accent"><i class="fas fa-map-marker-alt"></i></div>
                            <span class="mt-1">Kalimela Main Road,<br>Malkangiri, Odisha</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-accent"><i class="fas fa-phone-alt"></i></div>
                            <span>8018048111</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-500 text-sm font-medium">&copy; 2024 Tapas Mobile Care. Odisha's No.1 Showroom.</p>
                <div class="flex items-center gap-4 text-gray-500 text-2xl opacity-50">
                    <i class="fab fa-apple"></i>
                    <i class="fab fa-android"></i>
                    <i class="fab fa-windows"></i>
                </div>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHtml);
    document.body.insertAdjacentHTML('beforeend', footerHtml);
    
    // Bind Mobile Menu Events
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        const icon = btn.querySelector('i');
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Scroll Navbar logic
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    }

    // Init UI
    updateCartUI();
}

function generateWhatsAppLink(productName = '') {
    const phone = '918018048111';
    let message = "Hello Tapas Mobile Care, I have an inquiry.";
    if (productName) {
        message = `Hello Tapas Mobile Care, I am interested in [${productName}]. Please share the current price and availability.`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Render Shell (Nav & Footer & Cart) on every page
    renderAppShell();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Initialize 3D Tilt for static elements
    setTimeout(init3DTilt, 500);
});

// Premium 3D Tilt Effect (Vanilla JS)
function init3DTilt() {
    const tiltElements = document.querySelectorAll('.tilt-3d');
    
    if (window.matchMedia("(hover: hover)").matches) {
        tiltElements.forEach(el => {
            // Remove existing listeners if called multiple times
            el.removeEventListener('mousemove', handleTilt);
            el.removeEventListener('mouseleave', resetTilt);
            el.removeEventListener('mouseenter', setupTilt);
            
            el.addEventListener('mousemove', handleTilt);
            el.addEventListener('mouseleave', resetTilt);
            el.addEventListener('mouseenter', setupTilt);
            
            // Add will-change for performance
            el.style.willChange = 'transform';
            el.style.transformStyle = 'preserve-3d';
        });
    }

    function setupTilt(e) {
        const el = e.currentTarget;
        el.style.transition = 'transform 0.1s ease-out';
    }

    function handleTilt(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        const maxTilt = 8; // Gentle Apple-like tilt
        const tiltX = -(y * maxTilt * 2).toFixed(2);
        const tiltY = (x * maxTilt * 2).toFixed(2);
        
        const glare = el.querySelector('.tilt-glare');
        if(glare) {
            glare.style.opacity = '1';
            glare.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
        }

        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function resetTilt(e) {
        const el = e.currentTarget;
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        
        const glare = el.querySelector('.tilt-glare');
        if(glare) {
            glare.style.opacity = '0';
        }
    }
}

// Make sure to expose init3DTilt globally so inline scripts can re-trigger it
window.init3DTilt = init3DTilt;

// Render a single product card (Updated with Add to Cart & 3D Tilt)
function createProductCard(product) {
    const waLink = generateWhatsAppLink(product.name);
    return `
        <div class="tilt-3d bg-surface rounded-2xl p-3 sm:p-5 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 group flex flex-col h-full reveal relative overflow-hidden" style="transform-style: preserve-3d;">
            <!-- Hover Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <!-- Premium 3D Glare Layer -->
            <div class="tilt-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 pointer-events-none z-50 rounded-2xl mix-blend-overlay transition-opacity duration-300 pointer-events-none w-[200%] h-[200%] -left-[50%] -top-[50%]"></div>
            
            <div class="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-50/50 mb-3 sm:mb-5 flex items-center justify-center p-2 sm:p-4 border border-gray-100" style="transform: translateZ(20px);">
                ${product.badge ? `<span class="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white text-[8px] sm:text-[10px] font-black px-2 py-1 sm:px-3 sm:py-1 rounded-full z-10 shadow-lg tracking-wider uppercase">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" loading="lazy">
                
                <!-- Quick Add Overlay (Desktop) -->
                <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
                    <button onclick="addToCart('${product.id}')" class="w-full bg-primary/90 backdrop-blur-md text-white py-3 rounded-xl font-bold shadow-xl hover:bg-black transition-colors text-sm flex items-center justify-center gap-2">
                        <i class="fas fa-cart-plus"></i> Quick Add
                    </button>
                </div>
            </div>
            
            <div class="flex-grow flex flex-col relative z-10" style="transform: translateZ(15px);">
                <span class="text-[8px] sm:text-[10px] font-black text-accent uppercase tracking-widest mb-1">${product.brand}</span>
                <h4 class="font-bold text-sm sm:text-lg text-primary mb-1 sm:mb-2 line-clamp-1 group-hover:text-accent transition-colors">${product.name}</h4>
                <p class="text-[10px] sm:text-xs text-secondary mb-3 sm:mb-4 line-clamp-2 leading-relaxed">${product.shortDesc}</p>
                <div class="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                    <p class="font-black text-primary mb-3 sm:mb-4 text-sm sm:text-lg">${product.price}</p>
                    <div class="flex flex-col gap-2">
                        <div class="grid grid-cols-2 gap-2">
                            <a href="product-details.html?id=${product.id}" class="w-full text-center bg-gray-100 hover:bg-gray-200 text-primary py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-colors text-xs sm:text-sm">
                                Details
                            </a>
                            <button onclick="addToCart('${product.id}')" class="w-full sm:hidden text-center bg-primary hover:bg-black text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-colors text-xs sm:text-sm shadow-md">
                                Cart
                            </button>
                        </div>
                        <a href="${waLink}" target="_blank" class="w-full text-center bg-[#25D366] hover:bg-[#1DA851] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-[#25D366]/20">
                            <i class="fab fa-whatsapp text-sm sm:text-lg"></i> Inquiry
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

