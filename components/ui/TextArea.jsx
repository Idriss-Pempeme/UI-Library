'use client';

import { useState } from 'react';
import styles from './TextArea.module.css';

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  required,
  maxLength,
  rows = 4,
  disabled,
  id,
  name,
  className,
}) {
  const [focused, setFocused] = useState(false);
  const charCount = value?.length || 0;
  const inputId = id || `textarea-${name || label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${focused ? styles.focused : ''} ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        name={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        required={required}
        rows={rows}
        className={styles.textarea}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
      />
      <div className={styles.footer}>
        {error ? (
          <p id={`${inputId}-error`} className={styles.error} role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className={styles.hint}>{hint}</p>
        ) : <span />}
        {maxLength && (
          <span className={`${styles.charCount} ${charCount > maxLength * 0.9 ? styles.charCountWarning : ''}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
