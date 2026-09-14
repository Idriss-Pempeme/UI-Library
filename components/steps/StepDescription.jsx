'use client';

import { useFormState } from '@/hooks/useFormState';
import RichTextEditor from '@/components/ui/RichTextEditor';
import styles from './Steps.module.css';

export default function StepDescription({ errors }) {
  const { formData, updateField, addListItem, removeListItem, updateListItem } = useFormState();

  const renderListField = (field, label, placeholder, required = false) => {
    const items = formData[field] || [''];
    return (
      <div className={styles.listSection}>
        <div className={styles.listLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </div>
        <div className={styles.listItems}>
          {items.map((item, i) => (
            <div key={i} className={styles.listItem}>
              <input
                type="text"
                className={styles.listItemInput}
                value={item}
                onChange={(e) => updateListItem(field, i, e.target.value)}
                placeholder={`${placeholder} ${i + 1}`}
              />
              {items.length > 1 && (
                <button type="button" className={styles.removeItemBtn} onClick={() => removeListItem(field, i)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" className={styles.addItemBtn} onClick={() => addListItem(field, '')}>
          + Add another
        </button>
        {errors?.[field] && <p className={styles.listError}>{errors[field]}</p>}
      </div>
    );
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>✏️ Describe your course</h2>
        <p className={styles.stepDescription}>Help students understand what they&apos;ll learn and who this course is for.</p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.fullWidth}>
          <RichTextEditor
            label="Course Description"
            value={formData.description}
            onChange={(v) => updateField('description', v)}
            placeholder="Describe what your course covers, its key benefits, and why students should enroll..."
            hint="A detailed description helps students make informed decisions"
            error={errors?.description}
            required
            minHeight="200px"
          />
        </div>

        <div className={styles.fullWidth}>
          <hr className={styles.sectionDivider} />
        </div>

        <div className={styles.fullWidth}>
          {renderListField('learningObjectives', 'What will students learn?', 'e.g., Build responsive websites from scratch', true)}
        </div>

        <div className={styles.fullWidth}>
          {renderListField('prerequisites', 'Prerequisites (optional)', 'e.g., Basic understanding of HTML')}
        </div>

        <div className={styles.fullWidth}>
          {renderListField('targetAudience', 'Who is this course for? (optional)', 'e.g., Aspiring web developers')}
        </div>
      </div>
    </div>
  );
}
