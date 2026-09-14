'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './TagInput.module.css';

export default function TagInput({
  label,
  tags = [],
  onChange,
  placeholder = 'Type and press Enter to add',
  hint,
  error,
  required,
  maxTags,
  className,
}) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const addTag = useCallback((value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;
    onChange([...tags, trimmed]);
    setInputValue('');
  }, [tags, onChange, maxTags]);

  const removeTag = useCallback((index) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags);
  }, [tags, onChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }, [inputValue, tags, addTag, removeTag]);

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className || ''}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.container} onClick={() => inputRef.current?.focus()}>
        {tags.map((tag, i) => (
          <span key={`${tag}-${i}`} className={styles.tag}>
            {tag}
            <button
              type="button"
              className={styles.removeTag}
              onClick={(e) => { e.stopPropagation(); removeTag(i); }}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={maxTags && tags.length >= maxTags}
        />
      </div>
      <div className={styles.footer}>
        {error ? (
          <p className={styles.error} role="alert">{error}</p>
        ) : hint ? (
          <p className={styles.hint}>{hint}</p>
        ) : <span />}
        {maxTags && (
          <span className={styles.count}>{tags.length}/{maxTags}</span>
        )}
      </div>
    </div>
  );
}
