'use client';
import styles from './RadioGroup.module.css';

export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required,
  layout = 'vertical',
  cardStyle = false,
  className,
}) {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      {label && (
        <div className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </div>
      )}
      <div className={`${styles.group} ${layout === 'horizontal' ? styles.horizontal : styles.vertical} ${cardStyle ? styles.cardStyle : ''}`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`${styles.option} ${value === opt.value ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className={styles.input}
            />

            <div className={styles.optionContent}>
              {opt.icon && (
                <span 
                  className={styles.optionIcon} 
                  dangerouslySetInnerHTML={typeof opt.icon === 'string' ? { __html: opt.icon } : undefined}
                >
                  {typeof opt.icon !== 'string' ? opt.icon : null}
                </span>
              )}
              <div className={styles.optionText}>
                <span className={styles.optionLabel}>{opt.label}</span>
                {opt.description && <span className={styles.optionDesc}>{opt.description}</span>}
              </div>
            </div>
          </label>
        ))}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}
