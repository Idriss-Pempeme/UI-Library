'use client';

import { useFormState } from '@/hooks/useFormState';
import Toggle from '@/components/ui/Toggle';
import TextInput from '@/components/ui/TextInput';
import SelectDropdown from '@/components/ui/SelectDropdown';
import RadioGroup from '@/components/ui/RadioGroup';
import { CURRENCIES, DIFFICULTY_LEVELS, VISIBILITY_OPTIONS } from '@/lib/constants';
import styles from './Steps.module.css';

export default function StepPricing({ errors }) {
  const { formData, updateField } = useFormState();
  const currencySymbol = CURRENCIES.find(c => c.value === formData.currency)?.symbol || 'EUR';

  return (
    <div className={styles.stepContainerCentered}>
      <div className={styles.stepHeaderCentered}>
        <h2 className={styles.stepTitle}>Tarification et acces</h2>
        <p className={styles.stepDescription}>Definissez le prix, le niveau et la visibilite de votre cours.</p>
      </div>

      <div className={styles.pricingCardsWrapper}>
        {/* Card 1: Monetization */}
        <div className={styles.pricingSectionCard}>
          <div className={styles.pricingSectionHeader}>
            <div className={styles.pricingSectionIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3>Modele economique</h3>
          </div>
          <div className={styles.pricingSectionBody}>
            <Toggle
              label="Cours gratuit"
              description="Rendre ce cours accessible gratuitement"
              checked={formData.isFree}
              onChange={(v) => updateField('isFree', v)}
            />

            {!formData.isFree && (
              <div className={styles.rowTwo}>
                <SelectDropdown
                  label="Devise"
                  value={formData.currency}
                  onChange={(v) => updateField('currency', v)}
                  options={CURRENCIES}
                />
                <TextInput
                  label="Prix"
                  value={formData.price}
                  onChange={(v) => updateField('price', v)}
                  placeholder="29.99"
                  type="number"
                  error={errors?.price}
                  required
                  icon={currencySymbol}
                />
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Access Settings */}
        <div className={styles.pricingSectionCard}>
          <div className={styles.pricingSectionHeader}>
            <div className={styles.pricingSectionIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3>Visibilite et Accessibilite</h3>
          </div>
          <div className={styles.pricingSectionBody}>
            <RadioGroup
              label=""
              name="visibility"
              value={formData.visibility}
              onChange={(v) => updateField('visibility', v)}
              options={VISIBILITY_OPTIONS}
              layout="horizontal"
            />
          </div>
        </div>

        {/* Card 3: Pedagogy */}
        <div className={styles.pricingSectionCard}>
          <div className={styles.pricingSectionHeader}>
            <div className={styles.pricingSectionIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <h3>Parametres pedagogiques</h3>
          </div>
          <div className={styles.pricingSectionBody}>
            <SelectDropdown
              label="Niveau de difficulte"
              value={formData.difficultyLevel}
              onChange={(v) => updateField('difficultyLevel', v)}
              options={DIFFICULTY_LEVELS}
            />

            <Toggle
              label="Attestation de completion"
              description="Delivrer une attestation aux apprenants qui terminent le cours"
              checked={formData.certificateEnabled}
              onChange={(v) => updateField('certificateEnabled', v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
