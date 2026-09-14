'use client';

import { FormProvider } from '@/hooks/useFormState';
import { ToastProvider } from '@/components/ui/Toast';
import StepperWizard from '@/components/stepper/StepperWizard';

export default function CreateCoursePage() {
  return (
    <ToastProvider>
      <FormProvider>
        <StepperWizard />
      </FormProvider>
    </ToastProvider>
  );
}
