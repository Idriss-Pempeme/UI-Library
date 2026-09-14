'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './SelectDropdown.module.css';

export default function SelectDropdown({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  required,
  searchable,
  hint,
  disabled,
  id,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const inputId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-') || 'dropdown'}`;

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = searchable && search
    ? options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleSelect = useCallback((optValue) => {
    onChange(optValue);
    setIsOpen(false);
    setSearch('');
  }, [onChange]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Keyboard nav
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    } else if (e.key === 'Enter' && !isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className || ''}`} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <button
        id={inputId}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className={selectedOption ? styles.selectedText : styles.placeholderText}>
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className={styles.optionIcon}>{selectedOption.icon}</span>}
              {selectedOption.label}
            </>
          ) : placeholder}
        </span>
        <svg className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-label={label}>
          {searchable && (
            <div className={styles.searchContainer}>
              <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                ref={searchRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.noResults}>No options found</div>
            ) : (
              filteredOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.option} ${opt.value === value ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect(opt.value)}
                  role="option"
                  aria-selected={opt.value === value}
                >
                  {opt.icon && <span className={styles.optionIcon}>{opt.icon}</span>}
                  <div className={styles.optionContent}>
                    <span className={styles.optionLabel}>{opt.label}</span>
                    {opt.description && <span className={styles.optionDesc}>{opt.description}</span>}
                  </div>
                  {opt.value === value && (
                    <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && (
        <p className={styles.error} role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
