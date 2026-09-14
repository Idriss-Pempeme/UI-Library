'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './ImageUploader.module.css';

export default function ImageUploader({ label, value, onChange, hint, error, required, className }) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const inputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [onChange]);

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className || ''}`}>
      {label && (
        <label className={styles.label}>
          {label}{required && <span className={styles.required}>*</span>}
        </label>
      )}
      {preview ? (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Upload preview" className={styles.preview} />
          <div className={styles.previewOverlay}>
            <button type="button" className={styles.changeBtn} onClick={() => inputRef.current?.click()}>
              Change
            </button>
            <button type="button" className={styles.removeBtn} onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <div className={styles.dropzoneIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <p className={styles.dropzoneTitle}>Glissez une image ici ou cliquez pour parcourir</p>
          <p className={styles.dropzoneHint}>PNG, JPG ou WebP (max 5MB)</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={styles.hiddenInput}
      />
      {error && <p className={styles.error}>{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
