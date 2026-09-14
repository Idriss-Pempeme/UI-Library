'use client';
import styles from './StepNavigation.module.css';
import { WIZARD_STEPS } from '@/lib/constants';

export default function StepNavigation({ currentStep, onBack, onNext, onSaveDraft, onPublish, isLastStep, isFirstStep, hasErrors }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {!isFirstStep && (
            <button type="button" className={styles.backBtn} onClick={onBack}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
          )}
        </div>

        <div className={styles.center}>
        </div>

        <div className={styles.right}>
          <button type="button" className={styles.saveDraftBtn} onClick={onSaveDraft}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save Draft
          </button>
          {isLastStep ? (
            <button type="button" className={`${styles.publishBtn} ${hasErrors ? styles.disabled : ''}`} onClick={onPublish} disabled={hasErrors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              Publish Course
            </button>
          ) : (
            <button type="button" className={styles.nextBtn} onClick={onNext}>
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
