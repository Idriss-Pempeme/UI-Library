'use client';

import { useFormState } from '@/hooks/useFormState';
import VideoEmbed from '@/components/media/VideoEmbed';
import styles from './Steps.module.css';

export default function StepMedia({ errors }) {
  const { formData, updateField } = useFormState();

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>🎬 Add media & resources</h2>
        <p className={styles.stepDescription}>Add a promotional video to give students a preview of your course. You can also attach resources to individual lessons.</p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.fullWidth}>
          <VideoEmbed
            label="Promotional Video (optional)"
            value={formData.promoVideo}
            onChange={(v) => updateField('promoVideo', v)}
            hint="A great promo video can increase enrollment by up to 10x"
            error={errors?.promoVideo}
          />
        </div>

        <div className={styles.fullWidth}>
          <div style={{
            padding: 'var(--space-8)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            color: 'var(--color-text-tertiary)',
          }}>
            <p style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-3)' }}>📁</p>
            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              Resource uploads per lesson
            </p>
            <p style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-2)' }}>
              You can attach files to individual lessons in the Curriculum step. Supported formats: PDF, ZIP, DOC, PPT, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
