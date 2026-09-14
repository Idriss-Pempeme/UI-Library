'use client';

import { useFormState } from '@/hooks/useFormState';
import { COURSE_CATEGORIES, LANGUAGES, COURSE_TYPES, DIFFICULTY_LEVELS, VISIBILITY_OPTIONS, CURRENCIES } from '@/lib/constants';
import { getCompletionPercentage } from '@/lib/validation';
import { countTotalLessons } from '@/lib/utils';
import ProgressRing from '@/components/ui/ProgressRing';
import Badge from '@/components/ui/Badge';
import styles from './Steps.module.css';

export default function StepReview({ onGoToStep }) {
  const { formData } = useFormState();
  const completion = getCompletionPercentage(formData);
  const totalLessons = countTotalLessons(formData.sections || []);

  const getLabel = (options, value) => options.find(o => o.value === value)?.label || value || 'Non defini';

  const ReviewCard = ({ title, stepIndex, children }) => (
    <div className={styles.reviewCard}>
      <div className={styles.reviewCardHeader}>
        <span className={styles.reviewCardTitle}>{title}</span>
        <button type="button" className={styles.editLink} onClick={() => onGoToStep(stepIndex)}>
          Modifier
        </button>
      </div>
      <div className={styles.reviewCardBody}>{children}</div>
    </div>
  );

  const Row = ({ label, value, isEmpty }) => (
    <div className={styles.reviewRow}>
      <span className={styles.reviewLabel}>{label}</span>
      <span className={isEmpty || !value ? styles.reviewValueEmpty : styles.reviewValue}>
        {value || 'Non renseigne'}
      </span>
    </div>
  );

  return (
    <div className={styles.stepContainerCentered}>
      <div className={styles.stepHeaderCentered}>
        <h2 className={styles.stepTitle}>Verification et publication</h2>
        <p className={styles.stepDescription}>Relisez les informations ci-dessous avant de publier votre cours.</p>
      </div>

      <div className={styles.completionBanner}>
        <ProgressRing percentage={completion} size={64} strokeWidth={5} />
        <div className={styles.completionText}>
          <p className={styles.completionTitle}>
            {completion === 100 ? 'Pret a publier' : `${completion}% complete`}
          </p>
          <p className={styles.completionDesc}>
            {completion === 100
              ? 'Tous les champs requis sont remplis.'
              : 'Completez les champs manquants pour publier.'}
          </p>
        </div>
      </div>

      <div className={styles.pricingCardsWrapper}>
        {/* Card 1: Informations */}
        <div className={styles.pricingSectionCard}>
          <div className={styles.pricingSectionHeader}>
            <div className={styles.pricingSectionIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <h3 style={{ flex: 1 }}>Informations de base</h3>
            <button type="button" className={styles.editLink} onClick={() => onGoToStep(0)}>Modifier</button>
          </div>
          <div className={styles.pricingSectionBody}>
            <Row label="Titre" value={formData.title} isEmpty={!formData.title} />
            <Row label="Categorie" value={getLabel(COURSE_CATEGORIES, formData.category)} isEmpty={!formData.category} />
            <Row label="Langue" value={getLabel(LANGUAGES, formData.language)} />
            <Row label="Format" value={getLabel(COURSE_TYPES, formData.courseType)} />
            <Row label="Vignette" value={formData.thumbnail ? 'Importee' : null} isEmpty={!formData.thumbnail} />
          </div>
        </div>

        {/* Card 2: Contenu */}
        <div className={styles.pricingSectionCard}>
          <div className={styles.pricingSectionHeader}>
            <div className={styles.pricingSectionIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h3 style={{ flex: 1 }}>Contenu pedagogique</h3>
            <button type="button" className={styles.editLink} onClick={() => onGoToStep(1)}>Modifier</button>
          </div>
          <div className={styles.pricingSectionBody}>
            <Row label="Description" value={formData.description ? 'Redigee' : null} isEmpty={!formData.description} />
            <Row label="Objectifs" value={`${formData.learningObjectives?.filter(o => o.trim()).length || 0} objectif(s)`} />
            <Row label="Sections" value={`${formData.sections?.length || 0} section(s)`} />
            <Row label="Lecons" value={`${totalLessons} lecon(s)`} />
          </div>
        </div>

        {/* Card 3: Tarification */}
        <div className={styles.pricingSectionCard}>
          <div className={styles.pricingSectionHeader}>
            <div className={styles.pricingSectionIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
            </div>
            <h3 style={{ flex: 1 }}>Tarification et acces</h3>
            <button type="button" className={styles.editLink} onClick={() => onGoToStep(2)}>Modifier</button>
          </div>
          <div className={styles.pricingSectionBody}>
            <Row label="Prix" value={formData.isFree ? 'Gratuit' : `${CURRENCIES.find(c => c.value === formData.currency)?.symbol || ''}${formData.price}`} />
            <Row label="Visibilite" value={
              <Badge variant={formData.visibility === 'published' ? 'success' : formData.visibility === 'draft' ? 'warning' : 'info'}>
                {getLabel(VISIBILITY_OPTIONS, formData.visibility)}
              </Badge>
            } />
            <Row label="Niveau" value={getLabel(DIFFICULTY_LEVELS, formData.difficultyLevel)} />
            <Row label="Attestation" value={formData.certificateEnabled ? 'Activee' : 'Desactivee'} />
          </div>
        </div>
      </div>
    </div>
  );
}
