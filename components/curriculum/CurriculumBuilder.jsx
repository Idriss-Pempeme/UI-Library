'use client';

import { useCallback } from 'react';
import { useFormState } from '@/hooks/useFormState';
import { useDragReorder } from '@/hooks/useDragReorder';
import { generateId } from '@/lib/utils';
import SectionCard from './SectionCard';
import EmptyState from '@/components/ui/EmptyState';
import styles from './CurriculumBuilder.module.css';

export default function CurriculumBuilder() {
  const { formData, addSection, removeSection, updateSection, reorderSections, updateFields } = useFormState();
  const sections = formData.sections || [];

  const { draggedIndex, dragOverIndex, handleDragStart, handleDragOver, handleDrop, handleDragEnd } =
    useDragReorder(sections, reorderSections);

  const handleAddSection = useCallback(() => {
    addSection({
      id: generateId('section'),
      title: '',
      lessons: [
        { id: generateId('lesson'), title: '', type: 'video', isExpanded: true, content: '' }
      ],
      isExpanded: true,
    });
  }, [addSection]);

  const handleAddTemplate = useCallback(() => {
    updateFields({
      sections: [
        {
          id: generateId('section'),
          title: 'Introduction au cours',
          lessons: [
            { id: generateId('lesson'), title: 'Bienvenue et presentation', type: 'video', isExpanded: true, content: '' },
            { id: generateId('lesson'), title: 'Ressources a telecharger', type: 'resource', isExpanded: false, content: '' }
          ],
          isExpanded: true,
        },
        {
          id: generateId('section'),
          title: 'Concepts Fondamentaux',
          lessons: [
            { id: generateId('lesson'), title: 'Premiere lecon', type: 'video', isExpanded: false, content: '' }
          ],
          isExpanded: false,
        }
      ]
    });
  }, [updateFields]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Modules</h3>
          <p className={styles.subtitle}>
            {sections.length} module{sections.length !== 1 ? 's' : ''} · Glissez pour reordonner
          </p>
        </div>
        <button type="button" className={styles.addButton} onClick={handleAddSection}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Ajouter un module
        </button>
      </div>

      {sections.length === 0 ? (
        <div className={styles.onboardingContainer}>
          <div className={styles.onboardingIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/></svg>
          </div>
          <h4 className={styles.onboardingTitle}>Construisons votre programme</h4>
          <p className={styles.onboardingDesc}>Voulez-vous demarrer de zero ou utiliser notre structure recommandee pour gagner du temps ?</p>
          
          <div className={styles.onboardingOptions}>
            <button className={styles.onboardingBtnPrimary} onClick={handleAddTemplate}>
              <div className={styles.btnIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              </div>
              <div className={styles.btnText}>
                <strong>Generer une structure</strong>
                <span>Inclut une intro et des concepts de base</span>
              </div>
            </button>
            
            <button className={styles.onboardingBtnSecondary} onClick={handleAddSection}>
              <div className={styles.btnIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <div className={styles.btnText}>
                <strong>Demarrer de zero</strong>
                <span>Creer votre propre module vide</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.sectionsList}>
          {sections.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`${styles.sectionWrapper} ${draggedIndex === index ? styles.dragging : ''} ${dragOverIndex === index ? styles.dragOver : ''}`}
            >
              <SectionCard
                section={section}
                index={index}
                onUpdate={(updates) => updateSection(section.id, updates)}
                onRemove={() => removeSection(section.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
