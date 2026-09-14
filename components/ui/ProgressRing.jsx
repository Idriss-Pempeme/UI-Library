'use client';
import styles from './ProgressRing.module.css';

export default function ProgressRing({ percentage = 0, size = 64, strokeWidth = 5, className }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 100) return 'var(--color-success)';
    if (percentage >= 60) return 'var(--color-primary)';
    if (percentage >= 30) return 'var(--color-warning)';
    return 'var(--color-text-tertiary)';
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--color-border)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={getColor()} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className={styles.progress}
        />
      </svg>
      <span className={styles.label} style={{ fontSize: size * 0.22 }}>
        {Math.round(percentage)}%
      </span>
    </div>
  );
}
