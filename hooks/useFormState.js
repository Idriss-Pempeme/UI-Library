'use client';

import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { INITIAL_FORM_STATE } from '@/lib/constants';

const FormContext = createContext(null);

const STORAGE_KEY = 'course-creator-draft';

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };

    case 'UPDATE_FIELDS':
      return { ...state, ...action.fields };

    case 'ADD_LIST_ITEM': {
      const list = [...(state[action.field] || [])];
      list.push(action.value);
      return { ...state, [action.field]: list };
    }

    case 'REMOVE_LIST_ITEM': {
      const list = [...(state[action.field] || [])];
      list.splice(action.index, 1);
      return { ...state, [action.field]: list };
    }

    case 'UPDATE_LIST_ITEM': {
      const list = [...(state[action.field] || [])];
      list[action.index] = action.value;
      return { ...state, [action.field]: list };
    }

    case 'ADD_SECTION': {
      const sections = [...state.sections, action.section];
      return { ...state, sections };
    }

    case 'REMOVE_SECTION': {
      const sections = state.sections.filter(s => s.id !== action.sectionId);
      return { ...state, sections };
    }

    case 'UPDATE_SECTION': {
      const sections = state.sections.map(s =>
        s.id === action.sectionId ? { ...s, ...action.updates } : s
      );
      return { ...state, sections };
    }

    case 'REORDER_SECTIONS': {
      return { ...state, sections: action.sections };
    }

    case 'ADD_LESSON': {
      const sections = state.sections.map(s =>
        s.id === action.sectionId
          ? { ...s, lessons: [...s.lessons, action.lesson] }
          : s
      );
      return { ...state, sections };
    }

    case 'REMOVE_LESSON': {
      const sections = state.sections.map(s =>
        s.id === action.sectionId
          ? { ...s, lessons: s.lessons.filter(l => l.id !== action.lessonId) }
          : s
      );
      return { ...state, sections };
    }

    case 'UPDATE_LESSON': {
      const sections = state.sections.map(s =>
        s.id === action.sectionId
          ? {
              ...s,
              lessons: s.lessons.map(l =>
                l.id === action.lessonId ? { ...l, ...action.updates } : l
              ),
            }
          : s
      );
      return { ...state, sections };
    }

    case 'REORDER_LESSONS': {
      const sections = state.sections.map(s =>
        s.id === action.sectionId
          ? { ...s, lessons: action.lessons }
          : s
      );
      return { ...state, sections };
    }

    case 'MARK_STEP_COMPLETED': {
      const completedSteps = state.completedSteps.includes(action.stepIndex)
        ? state.completedSteps
        : [...state.completedSteps, action.stepIndex];
      return { ...state, completedSteps };
    }

    case 'LOAD_DRAFT':
      return { ...INITIAL_FORM_STATE, ...action.data };

    case 'RESET':
      return { ...INITIAL_FORM_STATE, createdAt: new Date().toISOString() };

    default:
      return state;
  }
}

export function FormProvider({ children }) {
  const [formData, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_DRAFT', data: parsed });
      } else {
        dispatch({ type: 'UPDATE_FIELD', field: 'createdAt', value: new Date().toISOString() });
      }
    } catch (e) {
      console.warn('Failed to load draft:', e);
    }
  }, []);

  // Auto-save to localStorage on every change (debounced via useAutoSave would be better,
  // but for simplicity we save on every render cycle after formData changes)
  useEffect(() => {
    try {
      const dataToSave = { ...formData, lastSavedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Failed to save draft:', e);
    }
  }, [formData]);

  const updateField = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  }, []);

  const updateFields = useCallback((fields) => {
    dispatch({ type: 'UPDATE_FIELDS', fields });
  }, []);

  const addListItem = useCallback((field, value = '') => {
    dispatch({ type: 'ADD_LIST_ITEM', field, value });
  }, []);

  const removeListItem = useCallback((field, index) => {
    dispatch({ type: 'REMOVE_LIST_ITEM', field, index });
  }, []);

  const updateListItem = useCallback((field, index, value) => {
    dispatch({ type: 'UPDATE_LIST_ITEM', field, index, value });
  }, []);

  const addSection = useCallback((section) => {
    dispatch({ type: 'ADD_SECTION', section });
  }, []);

  const removeSection = useCallback((sectionId) => {
    dispatch({ type: 'REMOVE_SECTION', sectionId });
  }, []);

  const updateSection = useCallback((sectionId, updates) => {
    dispatch({ type: 'UPDATE_SECTION', sectionId, updates });
  }, []);

  const reorderSections = useCallback((sections) => {
    dispatch({ type: 'REORDER_SECTIONS', sections });
  }, []);

  const addLesson = useCallback((sectionId, lesson) => {
    dispatch({ type: 'ADD_LESSON', sectionId, lesson });
  }, []);

  const removeLesson = useCallback((sectionId, lessonId) => {
    dispatch({ type: 'REMOVE_LESSON', sectionId, lessonId });
  }, []);

  const updateLesson = useCallback((sectionId, lessonId, updates) => {
    dispatch({ type: 'UPDATE_LESSON', sectionId, lessonId, updates });
  }, []);

  const reorderLessons = useCallback((sectionId, lessons) => {
    dispatch({ type: 'REORDER_LESSONS', sectionId, lessons });
  }, []);

  const markStepCompleted = useCallback((stepIndex) => {
    dispatch({ type: 'MARK_STEP_COMPLETED', stepIndex });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET' });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear draft:', e);
    }
  }, []);

  const value = {
    formData,
    dispatch,
    updateField,
    updateFields,
    addListItem,
    removeListItem,
    updateListItem,
    addSection,
    removeSection,
    updateSection,
    reorderSections,
    addLesson,
    removeLesson,
    updateLesson,
    reorderLessons,
    markStepCompleted,
    resetForm,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormState must be used within a FormProvider');
  }
  return context;
}
