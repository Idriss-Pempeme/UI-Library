'use client';

import { useFormState } from '@/hooks/useFormState';
import TextInput from '@/components/ui/TextInput';
import SelectDropdown from '@/components/ui/SelectDropdown';
import RadioGroup from '@/components/ui/RadioGroup';
import ImageUploader from '@/components/media/ImageUploader';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { COURSE_CATEGORIES, LANGUAGES, COURSE_TYPES } from '@/lib/constants';
import styles from './Steps.module.css';

export default function StepBasics({ errors }) {
  const { formData, updateField } = useFormState();

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Informations du cours</h2>
        <p className={styles.stepDescription}>Donnez un nom a votre cours et precisez sa categorie.</p>
      </div>

      <div className={styles.twoColumnStep}>
        <div className={styles.leftColumn}>
          <div className={styles.topRowWithThumbnail}>
            <div className={styles.thumbnailColumn}>
              <ImageUploader
                label="Vignette du cours"
                value={formData.thumbnail}
                onChange={(v) => updateField('thumbnail', v)}
                hint="Format : 1280x720px (16:9)"
              />
            </div>
            
            <div className={styles.fieldsColumn}>
              <TextInput
                label="Titre du cours"
                value={formData.title}
                onChange={(v) => updateField('title', v)}
                placeholder="ex. Apprendre le design graphique de A a Z"
                error={errors?.title}
                required
                maxLength={120}
              />

              <SelectDropdown
                label="Categorie"
                value={formData.category}
                onChange={(v) => updateField('category', v)}
                options={COURSE_CATEGORIES}
                placeholder="Selectionner une categorie"
                error={errors?.category}
                required
                searchable
              />

              <SelectDropdown
                label="Langue"
                value={formData.language}
                onChange={(v) => updateField('language', v)}
                options={LANGUAGES}
                searchable
              />
            </div>
          </div>

          <RadioGroup
            label="Format du cours"
            name="courseType"
            value={formData.courseType}
            onChange={(v) => updateField('courseType', v)}
            options={COURSE_TYPES}
            layout="horizontal"
          />
        </div>

        <div className={styles.rightColumn}>
          <RichTextEditor
            label="Description"
            value={formData.description}
            onChange={(v) => updateField('description', v)}
            placeholder="Presentez votre cours : ce que les apprenants vont apprendre, pourquoi ce cours est utile..."
            error={errors?.description}
            required
            minHeight="340px"
          />
        </div>
      </div>
    </div>
  );
}
