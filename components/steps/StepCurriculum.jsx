'use client';

import CurriculumBuilder from '@/components/curriculum/CurriculumBuilder';
import styles from './Steps.module.css';

export default function StepCurriculum({ errors }) {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>📚 Build your curriculum</h2>
        <p className={styles.stepDescription}>Organize your course into sections and lessons. Drag to reorder, and pick the lesson type that fits your content.</p>
      </div>

      {errors?.sections && (
        <div className={styles.listError} style={{ marginBottom: 'var(--space-4)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {errors.sections}
        </div>
      )}

      <CurriculumBuilder />
    </div>
  );
}
