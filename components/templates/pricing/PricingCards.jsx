'use client';
import { useState } from 'react';
import styles from './PricingCards.module.css';
import Link from 'next/link';

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Parfait pour les petits projets personnels.',
      priceMonthly: 15,
      priceAnnual: 12,
      features: ['1 Projet', '5 Utilisateurs', '10GB Stockage', 'Support par email'],
      cta: 'Commencer',
      isPopular: false,
    },
    {
      name: 'Pro',
      description: 'Pour les equipes en pleine croissance.',
      priceMonthly: 49,
      priceAnnual: 39,
      features: ['Projets illimites', '50 Utilisateurs', '100GB Stockage', 'Support prioritaire 24/7', 'Analyses avancees'],
      cta: 'Essai gratuit de 14 jours',
      isPopular: true,
    },
    {
      name: 'Enterprise',
      description: 'Solution sur mesure pour les grandes entreprises.',
      priceMonthly: 99,
      priceAnnual: 89,
      features: ['Tout dans Pro', 'Utilisateurs illimites', 'Stockage illimite', 'Gestionnaire de compte dedie', 'SSO & securite avancee'],
      cta: 'Contacter les ventes',
      isPopular: false,
    }
  ];

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>&larr; Retour a Lumino</Link>
        <h2 className={styles.title}>Une tarification simple et transparente</h2>
        <p className={styles.subtitle}>Choisissez le plan qui correspond parfaitement a vos besoins. Annulez a tout moment.</p>
        
        <div className={styles.toggleWrapper}>
          <span className={`${styles.toggleLabel} ${!isAnnual ? styles.activeLabel : ''}`}>Mensuel</span>
          <button 
            className={`${styles.toggleBtn} ${isAnnual ? styles.toggled : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <span className={styles.toggleKnob}></span>
          </button>
          <span className={`${styles.toggleLabel} ${isAnnual ? styles.activeLabel : ''}`}>
            Annuel <span className={styles.saveBadge}>-20%</span>
          </span>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {plans.map((plan, idx) => (
          <div key={idx} className={`${styles.card} ${plan.isPopular ? styles.popular : ''}`}>
            {plan.isPopular && <div className={styles.popularBadge}>Le plus populaire</div>}
            
            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDesc}>{plan.description}</p>
            </div>
            
            <div className={styles.priceContainer}>
              <span className={styles.currency}>$</span>
              <span className={styles.price}>{isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
              <span className={styles.period}>/mois</span>
            </div>
            {isAnnual && (
              <p className={styles.billingNote}>Facture ${(plan.priceAnnual * 12)} annuellement</p>
            )}

            <button className={`${styles.ctaBtn} ${plan.isPopular ? styles.primaryBtn : styles.secondaryBtn}`}>
              {plan.cta}
            </button>

            <div className={styles.featuresList}>
              {plan.features.map((feature, fIdx) => (
                <div key={fIdx} className={styles.featureItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
