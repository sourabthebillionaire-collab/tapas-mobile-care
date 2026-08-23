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
    <!-- Trust Badges -->
    <div class="bg-white border-t border-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                    <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0 mx-auto sm:mx-0"><i class="fas fa-award"></i></div>
                    <div>
                        <h4 class="font-bold text-gray-900 text-sm">100% Original</h4>
                        <p class="text-xs text-gray-500">Genuine Products</p>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                    <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0 mx-auto sm:mx-0"><i class="far fa-credit-card"></i></div>
                    <div>
                        <h4 class="font-bold text-gray-900 text-sm">Secure Payments</h4>
                        <p class="text-xs text-gray-500">Safe & Fast Payments</p>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                    <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0 mx-auto sm:mx-0"><i class="fas fa-shield-alt"></i></div>
                    <div>
                        <h4 class="font-bold text-gray-900 text-sm">1 Year Warranty</h4>
                        <p class="text-xs text-gray-500">On All Products</p>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                    <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0 mx-auto sm:mx-0"><i class="fas fa-truck"></i></div>
                    <div>
                        <h4 class="font-bold text-gray-900 text-sm">Fast Delivery</h4>
                        <p class="text-xs text-gray-500">Across Odisha</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Mockup Footer -->
    <div class="bg-white pb-6 px-4 sm:px-8">
        <footer class="bg-[#050511] text-white py-10 sm:py-12 rounded-3xl shadow-2xl overflow-hidden relative max-w-7xl mx-auto">
            <!-- Background glow -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <div class="flex items-center gap-4 py-4 md:py-0">
                        <div class="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0"><i class="fas fa-map-marker-alt"></i></div>
                        <div>
                            <h4 class="font-bold text-white text-sm mb-1">Visit Our Showroom</h4>
                            <p class="text-xs text-gray-400">Tapas Mobile Care, Kalimela Main Rd,<br>Malkangiri, Odisha 764045</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 py-4 md:py-0 md:pl-8">
                        <div class="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0"><i class="fas fa-phone-alt"></i></div>
                        <div>
                            <h4 class="font-bold text-white text-sm mb-1">Call Us</h4>
                            <p class="text-xs text-gray-400">+91 8018048111</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 py-4 md:py-0 md:pl-8">
                        <div class="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0"><i class="far fa-clock"></i></div>
                        <div>
                            <h4 class="font-bold text-white text-sm mb-1">Open Time</h4>
                            <p class="text-xs text-gray-400">10:00 AM - 8:00 PM<br>(All Days)</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
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

// Render a single product card (Updated to Ultra-Premium Mockup Style)
function createProductCard(product) {
    let badgeColor = 'bg-black';
    if(product.badge) {
        let b = product.badge.toLowerCase();
        if(b.includes('bestseller') || b.includes('best seller')) badgeColor = 'bg-blue-500';
        else if(b.includes('deal') || b.includes('sale') || b.includes('offer')) badgeColor = 'bg-red-500';
        else if(b.includes('new')) badgeColor = 'bg-black';
    }

    return `
        <a href="product-details.html?id=${product.id}" class="tilt-3d block bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 group relative overflow-hidden" style="transform-style: preserve-3d;">
            <!-- Premium 3D Glare Layer -->
            <div class="tilt-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 pointer-events-none z-50 rounded-3xl mix-blend-overlay transition-opacity duration-300 w-[200%] h-[200%] -left-[50%] -top-[50%]"></div>
            
            <!-- Top Bar: Badge & Heart -->
            <div class="flex justify-between items-start mb-4 relative z-10" style="transform: translateZ(15px);">
                ${product.badge ? `<span class="${badgeColor} text-white text-[8px] sm:text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wider uppercase">${product.badge}</span>` : '<div></div>'}
                <button class="text-gray-400 hover:text-red-500 transition-colors z-20" onclick="event.preventDefault(); this.querySelector('i').classList.toggle('far'); this.querySelector('i').classList.toggle('fas'); this.querySelector('i').classList.toggle('text-red-500');">
                    <i class="far fa-heart text-sm sm:text-base"></i>
                </button>
            </div>
            
            <!-- Product Image -->
            <div class="relative h-32 sm:h-40 mb-4 sm:mb-6 flex items-center justify-center" style="transform: translateZ(25px);">
                <img src="${product.image}" alt="${product.name}" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg" loading="lazy">
            </div>
            
            <!-- Product Details -->
            <div class="relative z-10" style="transform: translateZ(10px);">
                <h4 class="font-bold text-sm sm:text-base text-gray-900 mb-1 line-clamp-1 group-hover:text-accent transition-colors">${product.name}</h4>
                <div class="flex justify-between items-end">
                    <p class="text-[10px] sm:text-xs text-gray-500 font-medium">
                        From <span class="text-accent font-bold text-sm sm:text-base ml-1">${product.price}</span>
                    </p>
                    <i class="fas fa-chevron-right text-gray-300 text-[10px] group-hover:text-accent group-hover:translate-x-1 transition-all"></i>
                </div>
            </div>
        </a>
    `;
}

