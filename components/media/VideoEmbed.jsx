'use client';
import { useState, useMemo } from 'react';
import styles from './VideoEmbed.module.css';

export default function VideoEmbed({ label, value, onChange, hint, error, className }) {
  const [inputValue, setInputValue] = useState(value || '');

  const embedUrl = useMemo(() => {
    if (!inputValue) return null;
    try {
      const url = new URL(inputValue);
      // YouTube
      if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
        let videoId = '';
        if (url.hostname.includes('youtu.be')) {
          videoId = url.pathname.slice(1);
        } else {
          videoId = url.searchParams.get('v');
        }
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
      // Vimeo
      if (url.hostname.includes('vimeo.com')) {
        const match = url.pathname.match(/\/(\d+)/);
        if (match) return `https://player.vimeo.com/video/${match[1]}`;
      }
    } catch {
      return null;
    }
    return null;
  }, [inputValue]);

  const handleChange = (val) => {
    setInputValue(val);
    onChange(val);
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 9l5 3-5 3V9z"/><circle cx="12" cy="12" r="10"/></svg>
        <input
          type="url"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Paste YouTube or Vimeo URL"
          className={styles.input}
        />
        {inputValue && (
          <button type="button" className={styles.clearBtn} onClick={() => handleChange('')} aria-label="Clear">×</button>
        )}
      </div>
      {embedUrl && (
        <div className={styles.previewContainer}>
          <iframe
            src={embedUrl}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video preview"
          />
        </div>
      )}
      {inputValue && !embedUrl && (
        <p className={styles.invalidUrl}>Please enter a valid YouTube or Vimeo URL</p>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
