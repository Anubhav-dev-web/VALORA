// Global state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentCategory = '';
let searchTimeout = null;
let currentSearchQuery = '';

// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const wishlistSidebar = document.getElementById('wishlist-sidebar');
const overlay = document.getElementById('overlay');
const productModal = document.getElementById('product-modal');
const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateBadges();
    loadPageContent();
    setupEventListeners();
});

// Initialize application
function initializeApp() {
    // Get current page category from URL
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    
    if (page === 'index' || page === '') {
        currentCategory = 'home';
    } else {
        currentCategory = page;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation events
    if (cartBtn) cartBtn.addEventListener('click', () => toggleSidebar('cart'));
    if (wishlistBtn) wishlistBtn.addEventListener('click', () => toggleSidebar('wishlist'));
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            toggleMobileMenu();
        });
    }
    
    // Mobile nav category toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            toggleMobileSubmenu();
        });
    }
    
    // Close sidebar events
    document.querySelectorAll('.close-sidebar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sidebar = e.target.dataset.sidebar;
            toggleSidebar(sidebar);
        });
    });
    
    // Overlay click
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeSidebars();
            closeModal();
            closeMobileMenu();
        });
    }
    
    // Modal close
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeModal();
        });
    }
    
    // Category card clicks (home page)
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            window.location.href = `${category}.html`;
        });
    });
    
    // CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Sale CTA
    const saleCta = document.querySelector('.sale-cta');
    if (saleCta) {
        saleCta.addEventListener('click', () => {
            document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Filter and sort events (category pages)
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortSelect = document.getElementById('sort-select');
    const clearFilters = document.getElementById('clear-filters');
    
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
    if (brandFilter) brandFilter.addEventListener('change', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    if (clearFilters) clearFilters.addEventListener('click', clearAllFilters);
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', showCheckout);
    
    // Search functionality
    setupSearchEventListeners();
}

// Load page content based on current page
function loadPageContent() {
    if (currentCategory === 'home') {
        loadFeaturedProducts();
    } else if (currentCategory !== '') {
        loadCategoryProducts(currentCategory);
    }
}

// Load featured products for home page
function loadFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid) return;
    
    const featuredProducts = getFeaturedProducts();
    renderProducts(featuredProducts, grid);
}

// Load category products
function loadCategoryProducts(category) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const categoryProducts = getProductsByCategory(category);
    renderProducts(categoryProducts, grid);
}

// Render products in grid
function renderProducts(productList, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productList.length === 0) {
        container.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }
    
    productList.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.style.cursor = 'pointer';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-actions">
                <button class="action-btn wishlist-toggle" data-id="${product.id}" title="Add to Wishlist">
                    <i class="fas fa-heart ${isInWishlist(product.id) ? 'active' : ''}"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <p class="product-brand">${getBrandDisplayName(product.brand)}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listeners
    const wishlistToggle = card.querySelector('.wishlist-toggle');
    const addToCartBtn = card.querySelector('.add-to-cart');
    
    // Make entire card clickable to open modal
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking on action buttons
        if (!e.target.closest('.wishlist-toggle') && !e.target.closest('.add-to-cart')) {
            showProductModal(product.id);
        }
    });
    
    wishlistToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(product.id);
    });
    
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });
    
    return card;
}

// Toggle sidebar
function toggleSidebar(type) {
    const sidebar = document.getElementById(`${type}-sidebar`);
    
    if (sidebar.classList.contains('active')) {
        closeSidebars();
    } else {
        closeSidebars();
        closeMobileMenu(); // Close mobile menu when opening sidebar
        sidebar.classList.add('active');
        overlay.classList.add('active');
        
        if (type === 'cart') {
            renderCartItems();
        } else if (type === 'wishlist') {
            renderWishlistItems();
        }
    }
}

// Close all sidebars
function closeSidebars() {
    document.querySelectorAll('.sidebar').forEach(sidebar => {
        sidebar.classList.remove('active');
    });
    overlay.classList.remove('active');
}

// Close modal
function closeModal() {
    productModal.classList.remove('active');
    overlay.classList.remove('active');
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileNav.classList.contains('active')) {
        closeMobileMenu();
    } else {
        mobileMenuToggle.classList.add('active');
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        
        // Close any open sidebars
        closeSidebars();
    }
}

function closeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileSubmenu = document.querySelector('.mobile-nav-submenu');
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('active');
    if (mobileSubmenu) mobileSubmenu.classList.remove('active');
    if (mobileNavToggleBtn) mobileNavToggleBtn.classList.remove('active');
    
    // Only remove overlay if no sidebars are open
    const activeSidebars = document.querySelectorAll('.sidebar.active');
    if (activeSidebars.length === 0) {
        overlay.classList.remove('active');
    }
}

function toggleMobileSubmenu() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileSubmenu = document.querySelector('.mobile-nav-submenu');
    
    if (mobileSubmenu.classList.contains('active')) {
        mobileSubmenu.classList.remove('active');
        mobileNavToggle.classList.remove('active');
    } else {
        mobileSubmenu.classList.add('active');
        mobileNavToggle.classList.add('active');
    }
}

// Show product modal
function showProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="modal-details">
                <p class="modal-brand">${getBrandDisplayName(product.brand)}</p>
                <h2>${product.name}</h2>
                <p class="modal-price">${formatPrice(product.price)}</p>
                <p class="modal-description">${product.description}</p>
                <div class="modal-actions">
                    <button class="modal-add-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="modal-wishlist" data-id="${product.id}">
                        ${isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for modal buttons
    const modalAddCart = modalBody.querySelector('.modal-add-cart');
    const modalWishlist = modalBody.querySelector('.modal-wishlist');
    
    modalAddCart.addEventListener('click', () => {
        addToCart(product.id);
        closeModal();
    });
    
    modalWishlist.addEventListener('click', () => {
        toggleWishlist(product.id);
        modalWishlist.textContent = isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist';
    });
    
    productModal.classList.add('active');
    overlay.classList.add('active');
}

// Cart management
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateBadges();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateBadges();
    renderCartItems();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateBadges();
            renderCartItems();
        }
    }
}

function renderCartItems() {
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="empty-message">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    cartContent.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-brand">${getBrandDisplayName(item.brand)}</p>
                    <p class="item-price">${formatPrice(item.price)}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" 
                               onchange="updateCartQuantity('${item.id}', parseInt(this.value))" min="1" />
                        <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total.toFixed(2);
}

// Wishlist management
function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    if (isInWishlist(productId)) {
        wishlist = wishlist.filter(item => item.id !== productId);
        showNotification(`${product.name} removed from wishlist`);
    } else {
        wishlist.push(product);
        showNotification(`${product.name} added to wishlist!`);
    }
    
    saveWishlist();
    updateBadges();
    updateWishlistIcons();
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    updateBadges();
    renderWishlistItems();
    updateWishlistIcons();
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

function renderWishlistItems() {
    const wishlistContent = document.getElementById('wishlist-content');
    
    if (wishlist.length === 0) {
        wishlistContent.innerHTML = '<p class="empty-message">Your wishlist is empty</p>';
        return;
    }
    
    wishlistContent.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-brand">${getBrandDisplayName(item.brand)}</p>
                <p class="item-price">${formatPrice(item.price)}</p>
                <button class="add-to-cart" onclick="addToCart('${item.id}')">Add to Cart</button>
            </div>
            <button class="remove-item" onclick="removeFromWishlist('${item.id}')" title="Remove from wishlist">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Update wishlist heart icons
function updateWishlistIcons() {
    document.querySelectorAll('.wishlist-toggle').forEach(btn => {
        const productId = btn.dataset.id;
        const heart = btn.querySelector('i');
        
        if (isInWishlist(productId)) {
            heart.classList.add('active');
            btn.classList.add('active');
        } else {
            heart.classList.remove('active');
            btn.classList.remove('active');
        }
    });
}

// Update badge counts
function updateBadges() {
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
}

// Filter and sort functionality
function applyFilters() {
    if (currentCategory === 'home') return;
    
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortSelect = document.getElementById('sort-select');
    
    let products = getProductsByCategory(currentCategory);
    
    // Apply price filter
    if (priceFilter && priceFilter.value) {
        products = filterByPrice(products, priceFilter.value);
    }
    
    // Apply brand filter
    if (brandFilter && brandFilter.value) {
        products = filterByBrand(products, brandFilter.value);
    }
    
    // Apply sorting
    if (sortSelect && sortSelect.value) {
        products = sortProducts(products, sortSelect.value);
    }
    
    const grid = document.getElementById('products-grid');
    renderProducts(products, grid);
}

// Clear all filters
function clearAllFilters() {
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortSelect = document.getElementById('sort-select');
    
    if (priceFilter) priceFilter.value = '';
    if (brandFilter) brandFilter.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    
    applyFilters();
}

// Show checkout modal
function showCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const modalBody = document.getElementById('modal-body');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    modalBody.innerHTML = `
        <div class="checkout-modal">
            <h2>Checkout</h2>
            <div class="checkout-summary">
                <h3>Order Summary</h3>
                ${cart.map(item => `
                    <div class="summary-item">
                        <span>${item.name} (x${item.quantity})</span>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
                <div class="summary-item summary-total">
                    <span><strong>Total</strong></span>
                    <span><strong>${formatPrice(total)}</strong></span>
                </div>
            </div>
            
            <form class="checkout-form" id="checkout-form">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required />
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" required />
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" id="city" name="city" required />
                </div>
                <div class="form-group">
                    <label for="zipCode">ZIP Code</label>
                    <input type="text" id="zipCode" name="zipCode" required />
                </div>
                <div class="form-group">
                    <label for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                <button type="submit" class="place-order-btn">Place Order</button>
            </form>
        </div>
    `;
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrder();
    });
    
    productModal.classList.add('active');
    overlay.classList.add('active');
    closeSidebars();
}

// Process order (fake checkout)
function processOrder() {
    // Simulate order processing
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="checkout-modal" style="text-align: center; padding: 3rem;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
            <h2>Order Confirmed!</h2>
            <p style="margin: 1rem 0;">Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
            <p style="color: var(--text-secondary);">Order #: LX${Date.now()}</p>
            <button class="place-order-btn" onclick="closeModal(); clearCart();" style="margin-top: 2rem;">Continue Shopping</button>
        </div>
    `;
}

// Clear cart after successful order
function clearCart() {
    cart = [];
    saveCart();
    updateBadges();
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-color);
        color: var(--primary-color);
        padding: 1rem 1.5rem;
        border-radius: 4px;
        font-weight: 500;
        z-index: 4000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Local storage management
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== SEARCH FUNCTIONALITY =====

// Setup search event listeners
function setupSearchEventListeners() {
    // Desktop search
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchClear = document.getElementById('search-clear');
    const searchResults = document.getElementById('search-results');
    
    // Mobile search
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const mobileSearchClear = document.getElementById('mobile-search-clear');
    const mobileSearchResults = document.getElementById('mobile-search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            handleSearch(e.target.value, false);
        }, 300));
        
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                showSearchResults(false);
            } else {
                showSearchSuggestions(false);
            }
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            clearSearch(false);
        });
    }
    
    // Mobile search events
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', debounce((e) => {
            handleSearch(e.target.value, true);
        }, 300));
        
        mobileSearchInput.addEventListener('focus', () => {
            if (mobileSearchInput.value.trim()) {
                showSearchResults(true);
            } else {
                showSearchSuggestions(true);
            }
        });
        
        mobileSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(mobileSearchInput.value);
            }
        });
    }
    
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', () => {
            performSearch(mobileSearchInput.value);
        });
    }
    
    if (mobileSearchClear) {
        mobileSearchClear.addEventListener('click', () => {
            clearSearch(true);
        });
    }
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        const isSearchClick = e.target.closest('.search-container') || e.target.closest('.mobile-search-container');
        if (!isSearchClick) {
            hideSearchResults();
        }
    });
}

// Handle search input
function handleSearch(query, isMobile = false) {
    currentSearchQuery = query.trim();
    
    if (currentSearchQuery === '') {
        showSearchSuggestions(isMobile);
        return;
    }
    
    if (currentSearchQuery.length < 2) {
        hideSearchResults();
        return;
    }
    
    const results = searchProducts(currentSearchQuery);
    displaySearchResults(results, isMobile);
    showSearchResults(isMobile);
}

// Advanced search function
function searchProducts(query) {
    const allProducts = getAllProducts();
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return allProducts.filter(product => {
        const searchableText = [
            product.name,
            getBrandDisplayName(product.brand),
            product.description,
            product.category
        ].join(' ').toLowerCase();
        
        return searchTerms.every(term => searchableText.includes(term));
    }).sort((a, b) => {
        // Sort by relevance (exact name matches first, then brand matches)
        const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        
        if (aNameMatch !== bNameMatch) {
            return bNameMatch - aNameMatch;
        }
        
        const aBrandMatch = getBrandDisplayName(a.brand).toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        const bBrandMatch = getBrandDisplayName(b.brand).toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        
        if (aBrandMatch !== bBrandMatch) {
            return bBrandMatch - aBrandMatch;
        }
        
        return a.name.localeCompare(b.name);
    });
}

// Display search results
function displaySearchResults(results, isMobile = false) {
    const container = isMobile ? 
        document.getElementById('mobile-search-results') : 
        document.getElementById('search-results');
    
    if (!container) return;
    
    const content = container.querySelector('.search-results-content');
    
    if (results.length === 0) {
        content.innerHTML = `
            <div class="no-search-results">
                <i class="fas fa-search"></i>
                <p>No products found for "${currentSearchQuery}"</p>
                <small>Try different keywords or browse our categories</small>
            </div>
        `;
        return;
    }
    
    content.innerHTML = results.map(product => `
        <div class="search-result-item" data-product-id="${product.id}">
            <div class="search-result-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="search-result-details">
                <div class="search-result-name">${highlightSearchTerm(product.name, currentSearchQuery)}</div>
                <div class="search-result-brand">${highlightSearchTerm(getBrandDisplayName(product.brand), currentSearchQuery)}</div>
                <div class="search-result-price">${formatPrice(product.price)}</div>
            </div>
            <div class="search-result-category">${product.category}</div>
        </div>
    `).join('');
    
    // Add click event listeners to search results
    content.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            showProductModal(productId);
            hideSearchResults();
        });
    });
}

// Show search suggestions
function showSearchSuggestions(isMobile = false) {
    const container = isMobile ? 
        document.getElementById('mobile-search-results') : 
        document.getElementById('search-results');
    
    if (!container) return;
    
    const content = container.querySelector('.search-results-content');
    
    const suggestions = [
        'Rolex', 'Omega', 'Patek Philippe', 'Cartier',
        'Louboutin', 'Jimmy Choo', 'Gucci',
        'Louis Vuitton', 'Chanel', 'Hermès',
        'Ray-Ban', 'Oakley', 'Prada', 'Tom Ford',
        'Watches', 'Shoes', 'Bags', 'Glasses', 'Accessories'
    ];
    
    content.innerHTML = `
        <div class="search-suggestions">
            <h4>Popular Searches</h4>
            <div class="suggestion-tags">
                ${suggestions.map(suggestion => `
                    <span class="suggestion-tag" data-suggestion="${suggestion}">${suggestion}</span>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add click event listeners to suggestions
    content.querySelectorAll('.suggestion-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            const suggestion = e.target.dataset.suggestion;
            performSearch(suggestion);
        });
    });
    
    showSearchResults(isMobile);
}

// Perform search and navigate to results
function performSearch(query) {
    if (!query || query.trim() === '') return;
    
    const trimmedQuery = query.trim();
    
    // Update input fields
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    if (searchInput) searchInput.value = trimmedQuery;
    if (mobileSearchInput) mobileSearchInput.value = trimmedQuery;
    
    // Hide search results
    hideSearchResults();
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Get search results
    const results = searchProducts(trimmedQuery);
    
    // If on homepage, show results in featured section
    if (currentCategory === 'home') {
        const featuredGrid = document.getElementById('featured-products-grid');
        const featuredTitle = document.querySelector('.featured-products .section-title');
        
        if (featuredGrid && featuredTitle) {
            featuredTitle.textContent = `Search Results for "${trimmedQuery}"`;
            renderProducts(results, featuredGrid);
            
            // Scroll to results
            document.querySelector('.featured-products').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    } else {
        // On category pages, replace category products with search results
        const productsGrid = document.getElementById('products-grid');
        const pageHeader = document.querySelector('.page-header h1');
        
        if (productsGrid && pageHeader) {
            pageHeader.textContent = `Search Results for "${trimmedQuery}"`;
            renderProducts(results, productsGrid);
            
            // Scroll to results
            document.querySelector('.products-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Show notification
    showNotification(`Found ${results.length} product${results.length !== 1 ? 's' : ''} for "${trimmedQuery}"`);
}

// Clear search
function clearSearch(isMobile = false) {
    const searchInput = isMobile ? 
        document.getElementById('mobile-search-input') : 
        document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    
    currentSearchQuery = '';
    hideSearchResults();
    
    // Reset to original content if needed
    if (currentCategory === 'home') {
        const featuredGrid = document.getElementById('featured-products-grid');
        const featuredTitle = document.querySelector('.featured-products .section-title');
        
        if (featuredGrid && featuredTitle) {
            featuredTitle.textContent = 'Featured Products';
            loadFeaturedProducts();
        }
    } else if (currentCategory !== '') {
        const productsGrid = document.getElementById('products-grid');
        const pageHeader = document.querySelector('.page-header h1');
        
        if (productsGrid && pageHeader) {
            pageHeader.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
            loadCategoryProducts(currentCategory);
        }
    }
}

// Show search results dropdown
function showSearchResults(isMobile = false) {
    const container = isMobile ? 
        document.getElementById('mobile-search-results') : 
        document.getElementById('search-results');
    
    if (container) {
        container.classList.add('active');
    }
}

// Hide search results dropdown
function hideSearchResults() {
    const containers = [
        document.getElementById('search-results'),
        document.getElementById('mobile-search-results')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.classList.remove('active');
        }
    });
}

// Highlight search terms in results
function highlightSearchTerm(text, query) {
    if (!query || query.trim() === '') return text;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
}

// Escape special regex characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebars();
        closeModal();
        closeMobileMenu();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add loading states for better UX
function showLoading(container) {
    container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.category-card, .product-card').forEach(el => {
    observer.observe(el);
});

// Handle window resize to close mobile menu on desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking on mobile nav links
document.addEventListener('click', (e) => {
    if (e.target.matches('.mobile-nav-link')) {
        closeMobileMenu();
    }
});
