'use client';
import styles from './Badge.module.css';

export default function Badge({ children, variant = 'default', size = 'sm', icon, className }) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className || ''}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}
