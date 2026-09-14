'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './RichTextEditor.module.css';

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  required,
  minHeight = '180px',
  id,
  className,
}) {
  const editorRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const inputId = id || `rte-${label?.toLowerCase().replace(/\s+/g, '-') || 'editor'}`;

  const execCommand = useCallback((command, val = null) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (onChange) {
      onChange(editorRef.current?.innerHTML || '');
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (onChange) {
      onChange(editorRef.current?.innerHTML || '');
    }
  }, [onChange]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const tools = [
    { command: 'bold', icon: 'B', title: 'Bold', style: { fontWeight: 700 } },
    { command: 'italic', icon: 'I', title: 'Italic', style: { fontStyle: 'italic' } },
    { command: 'underline', icon: 'U', title: 'Underline', style: { textDecoration: 'underline' } },
    { type: 'separator' },
    { command: 'insertUnorderedList', icon: '• List', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1. List', title: 'Numbered List' },
    { type: 'separator' },
    { command: 'formatBlock', value: 'h3', icon: 'H', title: 'Heading' },
    { command: 'removeFormat', icon: '⊘', title: 'Clear Formatting' },
  ];

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${focused ? styles.focused : ''} ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.editorContainer}>
        <div className={styles.toolbar}>
          {tools.map((tool, i) => {
            if (tool.type === 'separator') {
              return <div key={i} className={styles.separator} />;
            }
            return (
              <button
                key={tool.command + (tool.value || '')}
                type="button"
                className={styles.toolButton}
                onClick={() => execCommand(tool.command, tool.value)}
                title={tool.title}
                style={tool.style}
                tabIndex={-1}
              >
                {tool.icon}
              </button>
            );
          })}
        </div>
        <div
          id={inputId}
          ref={editorRef}
          className={styles.editor}
          contentEditable
          role="textbox"
          aria-multiline="true"
          aria-label={label || 'Rich text editor'}
          data-placeholder={placeholder || 'Start typing...'}
          dangerouslySetInnerHTML={{ __html: value || '' }}
          onInput={handleInput}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ minHeight }}
          suppressContentEditableWarning
        />
      </div>
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
