'use client';

import { LESSON_TYPES } from '@/lib/constants';
import styles from './LessonItem.module.css';

export default function LessonItem({ lesson, sectionId, onUpdate, onRemove }) {
  const lessonType = LESSON_TYPES.find(t => t.value === lesson.type) || LESSON_TYPES[0];

  return (
    <div className={styles.item}>
      <div className={styles.dragHandle} title="Drag to reorder">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
      </div>
      <div className={styles.previewThumb} style={{ background: `${lessonType.color}15`, color: lessonType.color }} title={lessonType.label} dangerouslySetInnerHTML={{ __html: lessonType.icon }} />
      <div className={styles.columns}>
        <input
          type="text"
          className={styles.titleInput}
          value={lesson.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder={`Titre du ${lessonType.label.toLowerCase()}...`}
        />
        {lesson.type === 'video' ? (
          <input
            type="url"
            className={styles.linkInput}
            value={lesson.content || ''}
            onChange={(e) => onUpdate({ content: e.target.value })}
            placeholder="Lien de la video (YouTube, Vimeo...)"
          />
        ) : (
          <div className={styles.fileUploadWrapper}>
            <input
              type="file"
              className={styles.fileInput}
              onChange={(e) => onUpdate({ content: e.target.files[0]?.name })}
              accept={lessonType.accept || '*'}
            />
            <span className={styles.fileLabel}>
              {lesson.content || `Uploader un fichier ${lessonType.label}`}
            </span>
          </div>
        )}
      </div>
      <button type="button" className={styles.removeBtn} onClick={onRemove} title="Supprimer la lecon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}
