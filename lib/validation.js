import { WIZARD_STEPS } from './constants';

export function validateStep(stepIndex, formData) {
  const stepId = WIZARD_STEPS[stepIndex]?.id;
  switch (stepId) {
    case 'basics':
      return validateBasics(formData);
    case 'content':
      return validateContent(formData);
    case 'pricing':
      return validatePricing(formData);
    case 'review':
      return {};
    default:
      return {};
  }
}

function validateBasics(data) {
  const errors = {};
  if (!data.title?.trim()) {
    errors.title = 'Le titre est requis';
  } else if (data.title.trim().length < 5) {
    errors.title = 'Le titre doit comporter au moins 5 caracteres';
  } else if (data.title.trim().length > 120) {
    errors.title = 'Le titre ne peut pas depasser 120 caracteres';
  }
  if (!data.category) {
    errors.category = 'Veuillez selectionner une categorie';
  }
  if (!data.description?.trim()) {
    errors.description = 'La description est requise';
  } else if (data.description.trim().length < 30) {
    errors.description = 'La description doit comporter au moins 30 caracteres';
  }
  return errors;
}

function validateContent(data) {
  const errors = {};
  
  const sections = data.sections || [];
  if (sections.length === 0) {
    errors.sections = 'Veuillez ajouter au moins un module';
  } else {
    for (let i = 0; i < sections.length; i++) {
      if (!sections[i].lessons || sections[i].lessons.length === 0) {
        errors.sections = `Le module ${i + 1} doit contenir au moins une lecon`;
        break;
      }
    }
  }

  return errors;
}

function validatePricing(data) {
  const errors = {};
  if (!data.isFree) {
    if (!data.price || parseFloat(data.price) <= 0) {
      errors.price = 'Veuillez definir un prix superieur a 0';
    }
  }
  return errors;
}

export function getCompletionPercentage(formData) {
  let total = 0;
  let filled = 0;

  total += 2;
  if (formData.title?.trim()) filled++;
  if (formData.category) filled++;

  total += 2;
  if (formData.description?.trim()) filled++;
  
  const sections = formData.sections || [];
  const hasValidSections = sections.length > 0 && sections.every(s => s.lessons && s.lessons.length > 0);
  if (hasValidSections) filled++;

  total += 1;
  if (formData.isFree || (formData.price && parseFloat(formData.price) > 0)) filled++;

  return Math.round((filled / total) * 100);
}
