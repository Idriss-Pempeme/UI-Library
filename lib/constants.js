export const COURSE_CATEGORIES = [
  { value: 'development', label: 'Developpement' },
  { value: 'business', label: 'Business' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'photography', label: 'Photographie' },
  { value: 'music', label: 'Musique' },
  { value: 'health', label: 'Sante et bien-etre' },
  { value: 'finance', label: 'Finance et comptabilite' },
  { value: 'teaching', label: 'Enseignement' },
  { value: 'lifestyle', label: 'Mode de vie' },
  { value: 'it-software', label: 'Informatique et logiciels' },
  { value: 'personal-dev', label: 'Developpement personnel' },
];

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'zh', label: 'Chinese (Mandarin)' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ru', label: 'Russian' },
  { value: 'it', label: 'Italian' },
];

export const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Debutant', description: 'Aucune connaissance prealable requise' },
  { value: 'intermediate', label: 'Intermediaire', description: 'Quelques bases necessaires' },
  { value: 'advanced', label: 'Avance', description: 'Bonne maitrise des bases requise' },
  { value: 'all-levels', label: 'Tous niveaux', description: 'Accessible a tous' },
];

export const COURSE_TYPES = [
  { value: 'self-paced', label: 'Auto-formation', description: 'Les etudiants progressent a leur rythme', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>' },
  { value: 'live-cohort', label: 'Sessions en direct', description: 'Seances programmees avec un groupe', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { value: 'quiz-only', label: 'Evaluation', description: 'Contenu oriente evaluation et quiz', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M8 12l3 3 5-5"/></svg>' },
];

export const LESSON_TYPES = [
  { value: 'video', label: 'Video', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>', color: 'var(--color-accent-purple)' },
  { value: 'resource', label: 'Ressource', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>', color: 'var(--color-accent-pink)' },
];

export const CURRENCIES = [
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£' },
  { value: 'INR', label: 'INR (₹)', symbol: '₹' },
  { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
  { value: 'CAD', label: 'CAD (C$)', symbol: 'C$' },
  { value: 'AUD', label: 'AUD (A$)', symbol: 'A$' },
];

export const VISIBILITY_OPTIONS = [
  { value: 'draft', label: 'Brouillon', description: 'Visible uniquement par vous' },
  { value: 'published', label: 'Publie', description: 'Visible par tous' },
  { value: 'unlisted', label: 'Non liste', description: 'Accessible uniquement via lien direct' },
];

export const WIZARD_STEPS = [
  { id: 'basics', label: 'Informations', shortLabel: 'Informations', description: 'Titre, categorie et type de cours' },
  { id: 'content', label: 'Contenu', shortLabel: 'Contenu', description: 'Description et programme du cours' },
  { id: 'pricing', label: 'Tarification', shortLabel: 'Tarification', description: 'Prix, acces et visibilite' },
  { id: 'review', label: 'Publication', shortLabel: 'Publication', description: 'Verifier et publier le cours' },
];

export const INITIAL_FORM_STATE = {
  // Etape 1: Informations
  title: '',
  category: '',
  language: 'fr',
  courseType: 'self-paced',
  thumbnail: null,

  // Etape 2: Contenu
  description: '',
  learningObjectives: [''],
  sections: [
    {
      id: 'section-1',
      title: '',
      lessons: [],
      isExpanded: true,
    },
  ],

  // Etape 3: Tarification
  isFree: true,
  price: '',
  currency: 'EUR',
  visibility: 'draft',
  difficultyLevel: 'all-levels',
  certificateEnabled: false,

  // Meta
  lastSavedAt: null,
  createdAt: null,
  completedSteps: [],
};
