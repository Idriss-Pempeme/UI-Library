'use client';

import { useEffect } from 'react';
import { useFormState } from '@/hooks/useFormState';
import TextInput from '@/components/ui/TextInput';
import TextArea from '@/components/ui/TextArea';
import SelectDropdown from '@/components/ui/SelectDropdown';
import RadioGroup from '@/components/ui/RadioGroup';
import TagInput from '@/components/ui/TagInput';
import { DIFFICULTY_LEVELS, VISIBILITY_OPTIONS } from '@/lib/constants';
import { generateSlug } from '@/lib/utils';
import styles from './Steps.module.css';

export default function StepSettings({ errors }) {
  const { formData, updateField } = useFormState();

  // Auto-generate slug from title if empty
  useEffect(() => {
    if (formData.title && !formData.slug) {
      updateField('slug', generateSlug(formData.title));
    }
  }, []); // Only on mount

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>⚙️ Settings & SEO</h2>
        <p className={styles.stepDescription}>Configure visibility, SEO, and advanced options for your course.</p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.fullWidth}>
          <RadioGroup
            label="Visibility"
            name="visibility"
            value={formData.visibility}
            onChange={(v) => updateField('visibility', v)}
            options={VISIBILITY_OPTIONS}
            layout="horizontal"
            cardStyle
          />
        </div>

        <div className={styles.halfWidth}>
          <SelectDropdown
            label="Difficulty Level"
            value={formData.difficultyLevel}
            onChange={(v) => updateField('difficultyLevel', v)}
            options={DIFFICULTY_LEVELS}
          />
        </div>

        <div className={styles.halfWidth}>
          <TextInput
            label="Estimated Duration"
            value={formData.estimatedDuration}
            onChange={(v) => updateField('estimatedDuration', v)}
            placeholder="e.g., 12 hours"
            hint="Total time to complete the course"
          />
        </div>

        <div className={styles.fullWidth}>
          <hr className={styles.sectionDivider} />
          <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>SEO Settings</p>
        </div>

        <div className={styles.fullWidth}>
          <TextInput
            label="URL Slug"
            value={formData.slug}
            onChange={(v) => updateField('slug', v)}
            placeholder="my-awesome-course"
            hint="The URL path for your course: /courses/your-slug"
            error={errors?.slug}
            icon="🔗"
          />
        </div>

        <div className={styles.fullWidth}>
          <TextInput
            label="Meta Title"
            value={formData.metaTitle}
            onChange={(v) => updateField('metaTitle', v)}
            placeholder={formData.title || 'Course title for search engines'}
            hint="Appears in browser tabs and search results"
            maxLength={60}
            error={errors?.metaTitle}
          />
        </div>

        <div className={styles.fullWidth}>
          <TextArea
            label="Meta Description"
            value={formData.metaDescription}
            onChange={(v) => updateField('metaDescription', v)}
            placeholder="A compelling description for search engines..."
            hint="Appears in search results below the title"
            maxLength={160}
            rows={3}
            error={errors?.metaDescription}
          />
        </div>

        <div className={styles.fullWidth}>
          <TagInput
            label="Tags"
            tags={formData.tags}
            onChange={(v) => updateField('tags', v)}
            placeholder="Type a tag and press Enter"
            hint="Tags help students discover your course"
            maxTags={10}
          />
        </div>
      </div>
    </div>
  );
}
