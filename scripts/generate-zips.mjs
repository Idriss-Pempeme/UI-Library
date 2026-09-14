/**
 * generate-zips.mjs
 * 
 * Builds downloadable .zip files for each template in public/downloads/
 * Each zip includes all source files + a README.md with usage/integration instructions.
 * 
 * Run: node scripts/generate-zips.mjs
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const DOWNLOADS_DIR = path.join(ROOT, 'public', 'downloads');

// Ensure downloads directory exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// ============================================================
//  TEMPLATE DEFINITIONS
// ============================================================

const TEMPLATES = [
  {
    id: 'course-creator',
    title: 'Course Creator Wizard',
    description: 'A complete 4-step course creation wizard with validation, drag & drop curriculum builder, and CSS theming system.',
    files: [
      // Components
      { src: 'components/stepper', dest: 'components/stepper' },
      { src: 'components/steps', dest: 'components/steps' },
      { src: 'components/curriculum', dest: 'components/curriculum' },
      { src: 'components/media', dest: 'components/media' },
      { src: 'components/ui', dest: 'components/ui' },
      // Hooks
      { src: 'hooks/useFormState.js', dest: 'hooks/useFormState.js' },
      { src: 'hooks/useDragReorder.js', dest: 'hooks/useDragReorder.js' },
      // Lib
      { src: 'lib/constants.js', dest: 'lib/constants.js' },
      { src: 'lib/utils.js', dest: 'lib/utils.js' },
      { src: 'lib/validation.js', dest: 'lib/validation.js' },
      // Page
      { src: 'app/create', dest: 'app/create' },
      // Global CSS
      { src: 'app/globals.css', dest: 'app/globals.css' },
    ],
    dependencies: [],
    readme: (t) => `# ${t.title}

${t.description}

---

## 📦 What's Inside

\`\`\`
${t.id}/
├── components/
│   ├── stepper/         # StepperWizard, StepIndicator, StepNavigation
│   ├── steps/           # StepBasics, StepDescription, StepCurriculum, StepMedia, StepPricing, StepSettings, StepReview
│   ├── curriculum/      # CurriculumBuilder, SectionCard, LessonItem
│   ├── media/           # ImageUploader, VideoEmbed
│   └── ui/              # TextInput, TextArea, SelectDropdown, TagInput, Toggle, RadioGroup, Accordion, Modal, Toast, etc.
├── hooks/
│   ├── useFormState.js  # Central form state management
│   └── useDragReorder.js # Drag & drop reordering hook
├── lib/
│   ├── constants.js     # Step definitions, categories, languages
│   ├── utils.js         # Helper utilities
│   └── validation.js    # Form validation rules
├── app/
│   ├── create/          # Page entry point (page.js)
│   └── globals.css      # Design token system & global styles
└── README.md            # This file
\`\`\`

## 🚀 Quick Start

### 1. Copy the files into your Next.js project

Copy the \`components/\`, \`hooks/\`, and \`lib/\` directories into your project root. Copy the page from \`app/create/\` into your \`app/\` directory.

### 2. Merge global CSS tokens

Open \`app/globals.css\` from this package and merge the CSS custom properties (design tokens) into your own \`globals.css\`. The key variables are:

\`\`\`css
:root {
  --color-primary: #00e6b8;
  --color-bg-primary: #ffffff;
  --font-family: 'Inter', sans-serif;
  /* ... see globals.css for the full list */
}
\`\`\`

### 3. Update import paths

All imports use the \`@/\` alias (e.g., \`import TextInput from '@/components/ui/TextInput'\`). Make sure your \`jsconfig.json\` or \`tsconfig.json\` has:

\`\`\`json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`

### 4. Add the Google Font

Add this to your \`<head>\` or \`layout.js\`:

\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
\`\`\`

## 🤖 AI Integration Prompt

Use this prompt with ChatGPT, Claude, or any AI assistant to integrate this template seamlessly:

\`\`\`
Act as an Expert React & Next.js Engineer.
I have downloaded the "${t.title}" UI template from Lumino.
My current project setup is: [INSERT YOUR PROJECT SETUP HERE - e.g., Next.js 14 App Router, Tailwind/Vanilla CSS].

Please help me integrate this component seamlessly into my project without breaking my existing code.
Follow these rules strictly:
1. Adapt the global CSS variables and design tokens to match my existing theme.
2. Resolve any missing dependencies (like Lucide icons or utility libraries) gracefully.
3. Update the import paths (components, hooks, lib) to match my specific project architecture.
4. Do not overwrite my layout.js, globals.css, or root routing without explicitly asking first.
5. Break down the integration step-by-step so I can review each part.
\`\`\`

## 📋 Requirements

- **Next.js** 14+ (App Router)
- **React** 18+
- No additional npm dependencies required — all components use vanilla CSS modules.

## 📄 License

Free for personal and commercial use. Attribution appreciated but not required.

---

Built with ❤️ by **Lumino UI Library**
`
  },
  {
    id: 'dashboard-pro',
    title: 'Admin Dashboard Pro',
    description: 'A complete admin layout with responsive sidebar, hamburger menu, stats cards, transaction tables, and activity feeds.',
    files: [
      { src: 'components/templates/admin', dest: 'components/templates/admin' },
      { src: 'app/admin', dest: 'app/admin' },
      { src: 'app/globals.css', dest: 'app/globals.css' },
    ],
    dependencies: [],
    readme: (t) => `# ${t.title}

${t.description}

---

## 📦 What's Inside

\`\`\`
${t.id}/
├── components/
│   └── templates/
│       └── admin/
│           ├── AdminLayout.jsx          # Responsive layout with sidebar & topbar
│           └── AdminLayout.module.css   # Complete styling with mobile breakpoints
├── app/
│   ├── admin/
│   │   ├── page.js                      # Dashboard page with stats, tables, activity
│   │   └── admin.module.css             # Dashboard-specific responsive styles
│   └── globals.css                      # Design token system & global styles
└── README.md                            # This file
\`\`\`

## 🚀 Quick Start

### 1. Copy the files into your Next.js project

Copy the \`components/templates/admin/\` directory into your project. Copy \`app/admin/\` into your \`app/\` directory.

### 2. Merge global CSS tokens

Merge the CSS custom properties from \`app/globals.css\` into your own global stylesheet.

### 3. Use the AdminLayout wrapper

\`\`\`jsx
import AdminLayout from '@/components/templates/admin/AdminLayout';

export default function MyAdminPage() {
  return (
    <AdminLayout>
      <h1>My Custom Admin Page</h1>
      {/* Your content here */}
    </AdminLayout>
  );
}
\`\`\`

### 4. Features

- ✅ **Responsive sidebar** — slides in/out on mobile with overlay backdrop
- ✅ **Hamburger menu** — toggles sidebar with smooth animation
- ✅ **Click outside to close** — tap the overlay to dismiss on mobile
- ✅ **Auto-hide on resize** — sidebar auto-closes below 768px
- ✅ **Scroll lock** — prevents body scroll when mobile sidebar is open
- ✅ **Adaptive topbar** — search and username hide on small screens

## 🤖 AI Integration Prompt

\`\`\`
Act as an Expert React & Next.js Engineer.
I have downloaded the "${t.title}" UI template from Lumino.
My current project setup is: [INSERT YOUR PROJECT SETUP HERE - e.g., Next.js 14 App Router, Tailwind/Vanilla CSS].

Please help me integrate this admin layout into my project without breaking my existing code.
Follow these rules strictly:
1. Adapt the global CSS variables and design tokens to match my existing theme.
2. The AdminLayout component should wrap my admin pages as a layout shell.
3. Update the import paths to match my specific project architecture.
4. Do not overwrite my layout.js, globals.css, or root routing without asking first.
5. Help me add new sidebar navigation items and connect them to my existing routes.
\`\`\`

## 📋 Requirements

- **Next.js** 14+ (App Router)
- **React** 18+
- No additional npm dependencies required.

## 📄 License

Free for personal and commercial use.

---

Built with ❤️ by **Lumino UI Library**
`
  },
  {
    id: 'auth-flow',
    title: 'Authentication Flow',
    description: 'Login, signup, and password recovery pages with client-side validation and smooth animations.',
    files: [
      { src: 'components/templates/auth', dest: 'components/templates/auth' },
      { src: 'app/auth', dest: 'app/auth' },
      { src: 'app/globals.css', dest: 'app/globals.css' },
    ],
    dependencies: [],
    readme: (t) => `# ${t.title}

${t.description}

---

## 📦 What's Inside

\`\`\`
${t.id}/
├── components/
│   └── templates/
│       └── auth/
│           ├── AuthForm.jsx           # Login/Signup form with mode toggle
│           └── AuthForm.module.css    # Styled auth form with animations
├── app/
│   ├── auth/
│   │   └── page.js                    # Auth page entry point
│   └── globals.css                    # Design token system
└── README.md
\`\`\`

## 🚀 Quick Start

### 1. Copy the files into your Next.js project

Copy \`components/templates/auth/\` and \`app/auth/\` into your project.

### 2. Merge design tokens from \`globals.css\`

### 3. Use the AuthForm component

\`\`\`jsx
import AuthForm from '@/components/templates/auth/AuthForm';

export default function LoginPage() {
  return <AuthForm />;
}
\`\`\`

## 🤖 AI Integration Prompt

\`\`\`
Act as an Expert React & Next.js Engineer.
I have downloaded the "${t.title}" UI template from Lumino.
My current project setup is: [INSERT YOUR PROJECT SETUP HERE].

Please help me integrate this authentication flow into my project:
1. Connect the form submission to my authentication API (e.g., NextAuth, Supabase, Firebase).
2. Adapt the CSS design tokens to my existing theme.
3. Add proper error handling and loading states.
4. Update import paths for my project structure.
5. Do not overwrite my existing layout or routing without asking first.
\`\`\`

## 📋 Requirements

- **Next.js** 14+ (App Router) | **React** 18+

## 📄 License

Free for personal and commercial use.

---

Built with ❤️ by **Lumino UI Library**
`
  },
  {
    id: 'pricing-tables',
    title: 'Pricing Tables',
    description: 'Dynamic pricing components with monthly/annual toggle and recommendation badges.',
    files: [
      { src: 'components/templates/pricing', dest: 'components/templates/pricing' },
      { src: 'app/pricing', dest: 'app/pricing' },
      { src: 'app/globals.css', dest: 'app/globals.css' },
    ],
    dependencies: [],
    readme: (t) => `# ${t.title}

${t.description}

---

## 📦 What's Inside

\`\`\`
${t.id}/
├── components/
│   └── templates/
│       └── pricing/
│           ├── PricingCards.jsx           # Pricing cards with toggle
│           └── PricingCards.module.css    # Styled pricing layout
├── app/
│   ├── pricing/
│   │   └── page.js                       # Pricing page entry point
│   └── globals.css                       # Design token system
└── README.md
\`\`\`

## 🚀 Quick Start

### 1. Copy files into your project
### 2. Merge design tokens from \`globals.css\`
### 3. Use the PricingCards component

\`\`\`jsx
import PricingCards from '@/components/templates/pricing/PricingCards';

export default function PricingPage() {
  return <PricingCards />;
}
\`\`\`

## 🤖 AI Integration Prompt

\`\`\`
Act as an Expert React & Next.js Engineer.
I have downloaded the "${t.title}" UI template from Lumino.
My current project setup is: [INSERT YOUR PROJECT SETUP HERE].

Please help me integrate these pricing tables into my project:
1. Connect the pricing plans to my Stripe/payment API.
2. Adapt the CSS design tokens to my existing theme.
3. Make the plan data dynamic (fetched from my database/API).
4. Update import paths for my project structure.
5. Do not overwrite existing files without asking first.
\`\`\`

## 📋 Requirements

- **Next.js** 14+ (App Router) | **React** 18+

## 📄 License

Free for personal and commercial use.

---

Built with ❤️ by **Lumino UI Library**
`
  },
  {
    id: 'ecommerce-cards',
    title: 'E-commerce Product Cards',
    description: 'Responsive product cards with color selection, hover effects, and add-to-cart functionality.',
    files: [
      { src: 'components/templates/ecommerce', dest: 'components/templates/ecommerce' },
      { src: 'app/ecommerce', dest: 'app/ecommerce' },
      { src: 'app/globals.css', dest: 'app/globals.css' },
    ],
    dependencies: [],
    readme: (t) => `# ${t.title}

${t.description}

---

## 📦 What's Inside

\`\`\`
${t.id}/
├── components/
│   └── templates/
│       └── ecommerce/
│           ├── ProductGrid.jsx           # Product grid with cards
│           └── ProductGrid.module.css    # Styled product layout
├── app/
│   ├── ecommerce/
│   │   └── page.js                       # E-commerce page entry point
│   └── globals.css                       # Design token system
└── README.md
\`\`\`

## 🚀 Quick Start

### 1. Copy files into your project
### 2. Merge design tokens from \`globals.css\`
### 3. Use the ProductGrid component

\`\`\`jsx
import ProductGrid from '@/components/templates/ecommerce/ProductGrid';

export default function ShopPage() {
  return <ProductGrid />;
}
\`\`\`

## 🤖 AI Integration Prompt

\`\`\`
Act as an Expert React & Next.js Engineer.
I have downloaded the "${t.title}" UI template from Lumino.
My current project setup is: [INSERT YOUR PROJECT SETUP HERE].

Please help me integrate these product cards into my project:
1. Connect the product data to my database/CMS/API.
2. Implement the add-to-cart functionality with my cart state management.
3. Adapt the CSS design tokens to my existing theme.
4. Replace placeholder images with my actual product images.
5. Update import paths for my project structure.
\`\`\`

## 📋 Requirements

- **Next.js** 14+ (App Router) | **React** 18+

## 📄 License

Free for personal and commercial use.

---

Built with ❤️ by **Lumino UI Library**
`
  }
];

// ============================================================
//  ZIP GENERATION
// ============================================================

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`  ⚠ Source not found: ${src}`);
    return;
  }

  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

for (const template of TEMPLATES) {
  console.log(`\n📦 Building: ${template.title} (${template.id}.zip)`);
  
  const tmpDir = path.join(ROOT, '.tmp-zip', template.id);
  cleanDir(tmpDir);
  fs.mkdirSync(tmpDir, { recursive: true });

  // Copy all source files
  for (const file of template.files) {
    const srcPath = path.join(ROOT, file.src);
    const destPath = path.join(tmpDir, file.dest);
    console.log(`  → ${file.src}`);
    copyRecursive(srcPath, destPath);
  }

  // Generate README.md
  const readmeContent = template.readme(template);
  fs.writeFileSync(path.join(tmpDir, 'README.md'), readmeContent, 'utf8');
  console.log(`  → README.md (generated)`);

  // Create zip
  const zipPath = path.join(DOWNLOADS_DIR, `${template.id}.zip`);
  
  // Remove old zip if exists
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  // Use PowerShell Compress-Archive on Windows
  const tmpParent = path.join(ROOT, '.tmp-zip');
  try {
    execSync(
      `powershell -Command "Compress-Archive -Path '${tmpDir}\\*' -DestinationPath '${zipPath}' -Force"`,
      { cwd: ROOT, stdio: 'pipe' }
    );
    console.log(`  ✅ Created: public/downloads/${template.id}.zip`);
  } catch (err) {
    console.error(`  ❌ Failed to create zip: ${err.message}`);
  }
}

// Cleanup
cleanDir(path.join(ROOT, '.tmp-zip'));

console.log('\n✨ All zips generated successfully!');
console.log(`📁 Output: ${DOWNLOADS_DIR}\n`);
