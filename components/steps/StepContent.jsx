'use client';

import { useFormState } from '@/hooks/useFormState';
import CurriculumBuilder from '@/components/curriculum/CurriculumBuilder';
import styles from './Steps.module.css';

export default function StepContent({ errors }) {
  const { formData, updateField } = useFormState();

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Contenu du cours</h2>
        <p className={styles.stepDescription}>Decrivez votre cours et organisez son programme.</p>
      </div>

      <div className={styles.formStack}>
        <div className={styles.sectionDividerWrapper}>
          <hr className={styles.sectionDivider} />
          <span className={styles.sectionDividerLabel}>Modules</span>
        </div>

        <CurriculumBuilder />
        {errors?.sections && <p className={styles.listError} style={{ marginTop: 'var(--space-2)' }}>{errors.sections}</p>}
      </div>
    </div>
  );
}
