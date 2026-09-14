'use client';
import styles from './StepIndicator.module.css';
import { WIZARD_STEPS } from '@/lib/constants';

export default function StepIndicator({ currentStep, completedSteps = [], onStepClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {WIZARD_STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          const isAccessible = isCompleted || index <= currentStep;

          return (
            <button
              key={step.id}
              type="button"
              className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''} ${!isAccessible ? styles.locked : ''}`}
              onClick={() => isAccessible && onStepClick(index)}
              disabled={!isAccessible}
              title={step.label}
            >
              <div className={styles.indicator}>
                {isCompleted && !isActive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <span className={styles.number}>{index + 1}</span>
                )}
              </div>
              <div className={styles.labelGroup}>
                <span className={styles.label}>{step.shortLabel}</span>
              </div>
              {index < WIZARD_STEPS.length - 1 && <div className={`${styles.connector} ${isCompleted ? styles.connectorCompleted : ''}`} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
