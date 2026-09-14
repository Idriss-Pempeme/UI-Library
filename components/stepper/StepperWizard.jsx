'use client';

import { useState, useCallback } from 'react';
import { useFormState } from '@/hooks/useFormState';
import { useToast } from '@/components/ui/Toast';
import { validateStep } from '@/lib/validation';
import { WIZARD_STEPS } from '@/lib/constants';
import StepIndicator from './StepIndicator';
import StepNavigation from './StepNavigation';
import StepBasics from '@/components/steps/StepBasics';
import StepContent from '@/components/steps/StepContent';
import StepPricing from '@/components/steps/StepPricing';
import StepReview from '@/components/steps/StepReview';
import Link from 'next/link';
import styles from './StepperWizard.module.css';

const STEP_COMPONENTS = [
  StepBasics,
  StepContent,
  StepPricing,
  StepReview,
];

export default function StepperWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const { formData, markStepCompleted } = useFormState();
  const { addToast } = useToast();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === WIZARD_STEPS.length - 1;

  const goToStep = useCallback((step) => {
    setErrors({});
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      addToast('Veuillez corriger les erreurs avant de continuer.', 'error');
      return;
    }
    setErrors({});
    markStepCompleted(currentStep);
    goToStep(currentStep + 1);
  }, [currentStep, formData, markStepCompleted, goToStep, addToast]);

  const handleBack = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleSaveDraft = useCallback(() => {
    addToast('Brouillon enregistre.', 'success');
  }, [addToast]);

  const handlePublish = useCallback(() => {
    for (let i = 0; i < WIZARD_STEPS.length - 1; i++) {
      const stepErrors = validateStep(i, formData);
      if (Object.keys(stepErrors).length > 0) {
        setCurrentStep(i);
        setErrors(stepErrors);
        addToast(`Veuillez corriger les erreurs dans "${WIZARD_STEPS[i].label}".`, 'error');
        return;
      }
    }
    addToast('Cours publie avec succes.', 'success', 6000);
  }, [formData, addToast]);

  const handleStepClick = useCallback((step) => {
    if (step <= currentStep || formData.completedSteps?.includes(step - 1)) {
      goToStep(step);
    }
  }, [currentStep, formData.completedSteps, goToStep]);

  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className={styles.wizard}>
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
        <Link href="/" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          &larr; Retour a Lumino
        </Link>
      </div>
      <StepIndicator
        currentStep={currentStep}
        completedSteps={formData.completedSteps || []}
        onStepClick={handleStepClick}
      />
      <div className={styles.content}>
        <div className={styles.stepContent}>
          <CurrentStepComponent
            errors={errors}
            onGoToStep={goToStep}
          />
        </div>
      </div>
      <StepNavigation
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        hasErrors={false}
      />
    </div>
  );
}
