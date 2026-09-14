'use client';

import { useState, useCallback } from 'react';
import { useFormState } from '@/hooks/useFormState';
import { useDragReorder } from '@/hooks/useDragReorder';
import { generateId } from '@/lib/utils';
import { LESSON_TYPES } from '@/lib/constants';
import LessonItem from './LessonItem';
import styles from './SectionCard.module.css';

export default function SectionCard({ section, index, onUpdate, onRemove }) {
  const { addLesson, removeLesson, updateLesson, reorderLessons } = useFormState();
  const [showLessonTypes, setShowLessonTypes] = useState(false);

  const { draggedIndex, dragOverIndex, handleDragStart, handleDragOver, handleDrop, handleDragEnd } =
    useDragReorder(section.lessons, (newLessons) => reorderLessons(section.id, newLessons));

  const handleAddLesson = useCallback((type) => {
    const lessonType = LESSON_TYPES.find(t => t.value === type);
    addLesson(section.id, {
      id: generateId('lesson'),
      type,
      title: '',
      duration: '',
      content: '',
      isFree: false,
    });
    setShowLessonTypes(false);
  }, [addLesson, section.id]);

  return (
    <div className={`${styles.card} ${section.isExpanded ? styles.expanded : ''}`}>
      <div className={styles.header}>
        <div className={styles.dragHandle} title="Drag to reorder">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
        </div>
        <span className={styles.sectionNumber}>Module {index + 1}</span>
        <input
          type="text"
          className={styles.titleInput}
          value={section.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Titre du module..."
        />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => onUpdate({ isExpanded: !section.isExpanded })}
            title={section.isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg className={section.isExpanded ? styles.rotated : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button type="button" className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={onRemove} title="Supprimer le module">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>

      {section.isExpanded && (
        <div className={styles.body}>
          {section.lessons.length > 0 && (
            <div className={styles.lessonsList}>
              {section.lessons.map((lesson, i) => (
                <div
                  key={lesson.id}
                  draggable
                  onDragStart={(e) => { e.stopPropagation(); handleDragStart(e, i); }}
                  onDragOver={(e) => { e.stopPropagation(); handleDragOver(e, i); }}
                  onDrop={(e) => { e.stopPropagation(); handleDrop(e, i); }}
                  onDragEnd={handleDragEnd}
                  className={`${styles.lessonWrapper} ${draggedIndex === i ? styles.dragging : ''} ${dragOverIndex === i ? styles.dragOverLesson : ''}`}
                >
                  <LessonItem
                    lesson={lesson}
                    sectionId={section.id}
                    onUpdate={(updates) => updateLesson(section.id, lesson.id, updates)}
                    onRemove={() => removeLesson(section.id, lesson.id)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className={styles.addLessonArea}>
            {showLessonTypes ? (
              <div className={styles.lessonTypeGrid}>
                {LESSON_TYPES.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    className={styles.lessonTypeBtn}
                    onClick={() => handleAddLesson(type.value)}
                  >
                    <span className={styles.lessonTypeIcon} dangerouslySetInnerHTML={{ __html: type.icon }} />
                    <span className={styles.lessonTypeLabel}>{type.label}</span>
                  </button>
                ))}
                <button type="button" className={styles.cancelBtn} onClick={() => setShowLessonTypes(false)}>Annuler</button>
              </div>
            ) : (
              <button type="button" className={styles.addLessonBtn} onClick={() => setShowLessonTypes(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Ajouter une lecon
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
