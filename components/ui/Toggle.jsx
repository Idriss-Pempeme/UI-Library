'use client';
import styles from './Toggle.module.css';

export default function Toggle({ label, checked, onChange, description, disabled, id, className }) {
  const toggleId = id || `toggle-${label?.toLowerCase().replace(/\s+/g, '-') || 'switch'}`;
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <label htmlFor={toggleId} className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
        <div className={styles.textContent}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </div>
        <div className={styles.switchWrapper}>
          <input
            id={toggleId}
            type="checkbox"
            checked={!!checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className={styles.input}
            role="switch"
            aria-checked={!!checked}
          />
          <div className={`${styles.track} ${checked ? styles.trackOn : ''}`}>
            <div className={`${styles.thumb} ${checked ? styles.thumbOn : ''}`} />
          </div>
        </div>
      </label>
    </div>
  );
}
