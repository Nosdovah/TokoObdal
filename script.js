// Product Data
const products = [
    {
        id: 1,
        name: "Premium Halfmoon Betta",
        price: 45.00,
        image: "assets/images/betta.png",
        tag: "Bestseller"
    },
    {
        id: 2,
        name: "Kohaku Japanese Koi",
        price: 250.00,
        image: "assets/images/koi.png",
        tag: "Premium"
    },
    {
        id: 3,
        name: "Fancy Neon Guppy (Pair)",
        price: 35.00,
        image: "assets/images/guppy.png",
        tag: "New Arrival"
    }
];

// State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBadge = document.getElementById('cart-badge');
const toastContainer = document.getElementById('toast-container');

// Mobile Menu Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navbar = document.getElementById('navbar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Render Products
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${product.tag ? `<div class="product-tag">${product.tag}</div>` : ''}
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class='bx bx-cart-add'></i> Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    updateCartUI();
    showToast(`Added ${product.name} to cart.`);
}

function removeFromCart(index) {
    const removedProduct = cart[index].name;
    cart.splice(index, 1);
    updateCartUI();
    showToast(`Removed ${removedProduct} from cart.`);
}

function updateCartUI() {
    // Update Badge
    cartBadge.textContent = cart.length;

    // Remove old items but keep the empty message element
    const items = cartItemsContainer.querySelectorAll('.cart-item');
    items.forEach(item => item.remove());

    if (cart.length === 0) {
        emptyCartMessage.classList.add('active');
        cartTotalPrice.textContent = '$0.00';
    } else {
        emptyCartMessage.classList.remove('active');
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class='bx bx-trash'></i>
                </button>
            `;
            cartItemsContainer.insertBefore(itemEl, emptyCartMessage);
        });
        
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }
}

// UI Interactions (Sidebar, Overlay, Modals)
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class='bx bx-check-circle'></i> <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
