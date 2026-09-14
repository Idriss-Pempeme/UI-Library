'use client';
import { useState } from 'react';
import styles from './ProductGrid.module.css';
import Link from 'next/link';

const PRODUCTS = [
  {
    id: 1,
    name: 'Casque Audio Sans Fil Pro',
    category: 'Audio',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    colors: ['#0f172a', '#e2e8f0', '#f59e0b'],
    badge: 'Nouveau',
  },
  {
    id: 2,
    name: 'Montre Connectee Sport',
    category: 'Wearables',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    colors: ['#10b981', '#ef4444', '#0f172a'],
    badge: '-20%',
  },
  {
    id: 3,
    name: 'Appareil Photo Vintage',
    category: 'Photographie',
    price: 899.50,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    colors: ['#8b5cf6', '#0f172a'],
    badge: '',
  },
  {
    id: 4,
    name: 'Enceinte Bluetooth Portable',
    category: 'Audio',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    colors: ['#ec4899', '#3b82f6', '#0f172a'],
    badge: 'Populaire',
  },
];

export default function ProductGrid() {
  const [activeColors, setActiveColors] = useState({});

  const handleColorClick = (productId, color) => {
    setActiveColors({ ...activeColors, [productId]: color });
  };

  return (
    <div className={styles.ecommerceContainer}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>&larr; Retour a Lumino</Link>
        <h2 className={styles.title}>Notre Selection</h2>
        <p className={styles.subtitle}>Decouvrez nos produits les plus populaires avec des cartes interactives.</p>
      </div>

      <div className={styles.grid}>
        {PRODUCTS.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
              <img src={product.image} alt={product.name} className={styles.productImage} />
              
              <div className={styles.overlay}>
                <button className={styles.quickViewBtn}>Apercu rapide</button>
                <div className={styles.actions}>
                  <button className={styles.actionIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                  <button className={styles.actionIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.productInfo}>
              <div className={styles.category}>{product.category}</div>
              <h3 className={styles.productName}>{product.name}</h3>
              
              <div className={styles.priceRow}>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
                
                <div className={styles.colorSelector}>
                  {product.colors.map((color, idx) => {
                    const isActive = (activeColors[product.id] || product.colors[0]) === color;
                    return (
                      <button 
                        key={idx}
                        className={`${styles.colorDot} ${isActive ? styles.activeColor : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(product.id, color)}
                        aria-label={`Couleur ${color}`}
                      />
                    );
                  })}
                </div>
              </div>

              <button className={styles.addToCartBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7.6-3h7.2a2 2 0 0 0 2-1.6l2.3-10.4a1 1 0 0 0-1-1.2H5.6L4.7 1H1m3 4l1.6 9"/></svg>
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
