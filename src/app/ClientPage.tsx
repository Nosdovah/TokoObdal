"use client";

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
}

export default function ClientPage({ initialProducts }: { initialProducts: Product[] }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    showToast(`Added ${product.name} to cart.`);
  };

  const removeFromCart = (index: number) => {
    const removedProduct = cart[index].name;
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast(`Removed ${removedProduct} from cart.`);
  };

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts([...toasts, { id, message }]);
    setTimeout(() => {
      setToasts(current => current.filter(t => t.id !== id));
    }, 3000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="brand">
          <i className='bx bx-water'></i> Toko Obdal
        </a>
        <nav className="nav-links">
          <a href="#hero">Home</a>
          <a href="#collections">Freshwater Gems</a>
          <a href="#about">Our Story</a>
        </nav>
        <div className="nav-actions">
          <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
            <i className='bx bx-shopping-bag'></i>
            <span className="cart-badge">{cart.length}</span>
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <i className='bx bx-menu'></i>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
          <i className='bx bx-x'></i>
        </button>
        <nav className="mobile-nav-links">
          <a href="#hero" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#collections" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Freshwater Gems</a>
          <a href="#about" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
        </nav>
      </div>

      <section className="hero" id="hero">
        <div className="hero-content">
          <span className="hero-subtitle">Discover the Ocean's Most Exquisite</span>
          <h1 className="hero-title">Elevate Your Aquascape with Living Jewels.</h1>
          <p className="hero-desc">Premium freshwater ornamental fish curated for the discerning hobbyist. Experience unparalleled coloration and superior genetics.</p>
          <a href="#collections" className="btn btn-primary">Shop Collection <i className='bx bx-right-arrow-alt'></i></a>
        </div>
        <div className="hero-overlay"></div>
      </section>

      <section className="collections" id="collections">
        <div className="section-header">
          <h2>Freshwater Gems</h2>
          <p>Our handpicked selection of top-tier specimens.</p>
        </div>

        <div className="product-grid">
          {initialProducts.map(product => (
            <div key={product.id} className="product-card">
              {product.tag && <div className="product-tag">{product.tag}</div>}
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  <i className='bx bx-cart-add'></i> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-container">
          <div className="about-text">
            <h2>The Toko Obdal Difference</h2>
            <p>We believe that an aquarium is more than just glass and water—it's a living canvas. Our fish are bred by master breeders across the globe, ensuring pristine health, vibrant scales, and majestic fins. Every fish we deliver is a masterpiece.</p>
            <div className="features">
              <div className="feature">
                <i className='bx bx-check-shield'></i>
                <span>Health Guarantee</span>
              </div>
              <div className="feature">
                <i className='bx bx-package'></i>
                <span>Safe Overnight Shipping</span>
              </div>
              <div className="feature">
                <i className='bx bx-medal'></i>
                <span>Premium Genetics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3><i className='bx bx-water'></i> Toko Obdal</h3>
            <p>Bringing aquatic artistry into your home. The premier destination for elite ornamental fish.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#collections">Freshwater</a>
            <a href="#">Marine (Coming Soon)</a>
            <a href="#">Care Guides</a>
          </div>
          <div className="footer-socials">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#"><i className='bx bxl-instagram'></i></a>
              <a href="#"><i className='bx bxl-facebook-square'></i></a>
              <a href="#"><i className='bx bxl-tiktok'></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Toko Obdal. All rights reserved.</p>
        </div>
      </footer>

      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <i className='bx bx-x'></i>
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart-message active">
              <i className='bx bx-shopping-bag'></i>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(index)}>
                  <i className='bx bx-trash'></i>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary checkout-btn">Checkout</button>
        </div>
      </div>

      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            <i className='bx bx-check-circle'></i> <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}
