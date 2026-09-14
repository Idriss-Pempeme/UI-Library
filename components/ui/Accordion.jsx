'use client';
import { useState } from 'react';
import styles from './Accordion.module.css';

export default function Accordion({ title, children, defaultOpen = false, icon, className }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ''} ${className || ''}`}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.title}>{title}</span>
        <svg className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
