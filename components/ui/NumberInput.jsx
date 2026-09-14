'use client';
import styles from './NumberInput.module.css';

export default function NumberInput({ label, value, onChange, min, max, step = 1, placeholder, prefix, suffix, hint, error, required, disabled, id, className }) {
  const inputId = id || `number-${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}`;
  const numVal = value === '' || value === undefined || value === null ? '' : Number(value);

  const increment = () => {
    const next = (numVal === '' ? (min || 0) : numVal) + step;
    if (max !== undefined && next > max) return;
    onChange(next);
  };

  const decrement = () => {
    const next = (numVal === '' ? (min || 0) : numVal) - step;
    if (min !== undefined && next < min) return;
    onChange(next);
  };

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}{required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputContainer}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <button type="button" className={styles.stepBtn} onClick={decrement} disabled={disabled || (min !== undefined && numVal <= min)} aria-label="Decrease">−</button>
        <input
          id={inputId}
          type="number"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.input}
        />
        <button type="button" className={styles.stepBtn} onClick={increment} disabled={disabled || (max !== undefined && numVal >= max)} aria-label="Increase">+</button>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
