export const COURSE_CATEGORIES = [
  { value: 'development', label: 'Development', icon: '💻' },
  { value: 'business', label: 'Business', icon: '📊' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'marketing', label: 'Marketing', icon: '📢' },
  { value: 'photography', label: 'Photography', icon: '📷' },
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'health', label: 'Health & Fitness', icon: '💪' },
  { value: 'finance', label: 'Finance & Accounting', icon: '💰' },
  { value: 'teaching', label: 'Teaching & Academics', icon: '📚' },
  { value: 'lifestyle', label: 'Lifestyle', icon: '🌟' },
  { value: 'it-software', label: 'IT & Software', icon: '🖥️' },
  { value: 'personal-dev', label: 'Personal Development', icon: '🧠' },
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
  { value: 'beginner', label: 'Beginner', description: 'No prior knowledge required' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some foundational knowledge needed' },
  { value: 'advanced', label: 'Advanced', description: 'Requires strong understanding of basics' },
  { value: 'all-levels', label: 'All Levels', description: 'Suitable for everyone' },
];

export const COURSE_TYPES = [
  { value: 'self-paced', label: 'Self-Paced', description: 'Students learn at their own speed', icon: '🕐' },
  { value: 'live-cohort', label: 'Live Cohort', description: 'Scheduled live sessions with a group', icon: '👥' },
  { value: 'quiz-only', label: 'Quiz / Assessment', description: 'Assessment-focused with no video content', icon: '📝' },
];

export const LESSON_TYPES = [
  { value: 'video', label: 'Video Lesson', icon: '🎬', color: 'var(--color-accent-purple)' },
  { value: 'text', label: 'Text / Article', icon: '📄', color: 'var(--color-accent-blue)' },
  { value: 'quiz', label: 'Quiz', icon: '❓', color: 'var(--color-accent-orange)' },
  { value: 'assignment', label: 'Assignment', icon: '📋', color: 'var(--color-accent-green)' },
  { value: 'resource', label: 'Downloadable Resource', icon: '📁', color: 'var(--color-accent-pink)' },
  { value: 'live', label: 'Live Session', icon: '🔴', color: 'var(--color-accent-red)' },
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
  { value: 'draft', label: 'Draft', description: 'Only visible to you', icon: '📝' },
  { value: 'published', label: 'Published', description: 'Visible to everyone', icon: '🌐' },
  { value: 'unlisted', label: 'Unlisted', description: 'Only accessible via direct link', icon: '🔗' },
];

export const WIZARD_STEPS = [
  { id: 'basics', label: 'Course Basics', shortLabel: 'Basics', icon: '📋', description: 'Title, category, and course type' },
  { id: 'description', label: 'Description & Goals', shortLabel: 'Description', icon: '✏️', description: 'What students will learn' },
  { id: 'curriculum', label: 'Curriculum', shortLabel: 'Curriculum', icon: '📚', description: 'Sections and lessons' },
  { id: 'media', label: 'Media & Resources', shortLabel: 'Media', icon: '🎬', description: 'Videos, files, and attachments' },
  { id: 'pricing', label: 'Pricing & Access', shortLabel: 'Pricing', icon: '💳', description: 'Price, discounts, and enrollment' },
  { id: 'settings', label: 'Settings & SEO', shortLabel: 'Settings', icon: '⚙️', description: 'Visibility, SEO, and advanced options' },
  { id: 'review', label: 'Review & Publish', shortLabel: 'Review', icon: '🚀', description: 'Preview and publish your course' },
];

export const INITIAL_FORM_STATE = {
  // Step 1: Basics
  title: '',
  subtitle: '',
  category: '',
  subcategory: '',
  language: 'en',
  courseType: 'self-paced',
  thumbnail: null,

  // Step 2: Description
  description: '',
  learningObjectives: [''],
  prerequisites: [''],
  targetAudience: [''],

  // Step 3: Curriculum
  sections: [
    {
      id: 'section-1',
      title: 'Getting Started',
      lessons: [],
      isExpanded: true,
    },
  ],

  // Step 4: Media
  promoVideo: '',
  resources: [],

  // Step 5: Pricing
  isFree: true,
  price: '',
  currency: 'USD',
  discountEnabled: false,
  discountPrice: '',
  enrollmentLimit: '',
  dripSchedule: false,
  certificateEnabled: false,

  // Step 6: Settings
  slug: '',
  metaTitle: '',
  metaDescription: '',
  visibility: 'draft',
  difficultyLevel: 'all-levels',
  estimatedDuration: '',
  tags: [],

  // Meta
  lastSavedAt: null,
  createdAt: null,
  completedSteps: [],
};
