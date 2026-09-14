'use client';

import { useState } from 'react';
import styles from './TextInput.module.css';

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  required,
  maxLength,
  type = 'text',
  icon,
  disabled,
  id,
  name,
  autoFocus,
  className,
}) {
  const [focused, setFocused] = useState(false);
  const charCount = value?.length || 0;
  const inputId = id || `input-${name || label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${focused ? styles.focused : ''} ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          required={required}
          className={`${styles.input} ${icon ? styles.hasIcon : ''}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        />
        {maxLength && (
          <span className={`${styles.charCount} ${charCount > maxLength * 0.9 ? styles.charCountWarning : ''}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className={styles.error} role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className={styles.hint}>{hint}</p>
      )}
    </div>
  );
}
