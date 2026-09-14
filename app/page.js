'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Unique SVG icon per template
const TEMPLATE_ICONS = {
  'course-creator': (color) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      <line x1="6" y1="8" x2="8" y2="8"/>
      <line x1="6" y1="12" x2="8" y2="12"/>
      <line x1="16" y1="8" x2="18" y2="8"/>
      <line x1="16" y1="12" x2="18" y2="12"/>
    </svg>
  ),
  'dashboard-pro': (color) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1"/>
      <rect x="14" y="3" width="7" height="5" rx="1"/>
      <rect x="14" y="12" width="7" height="9" rx="1"/>
      <rect x="3" y="16" width="7" height="5" rx="1"/>
    </svg>
  ),
  'auth-flow': (color) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  'pricing-tables': (color) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  'ecommerce-cards': (color) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
};

const TEMPLATES = [
  {
    id: 'course-creator',
    title: 'Course Creator Wizard',
    category: 'Forms & Steppers',
    description: 'Un stepper en 4 etapes complet pour la creation de cours. Inclut la validation, le drag & drop et un systeme de themes CSS.',
    demoLink: '/create',
    color: '#00e6b8'
  },
  {
    id: 'dashboard-pro',
    title: 'Admin Dashboard Pro',
    category: 'Layouts',
    description: 'Un layout d\'administration complet avec sidebar responsive, graphiques et tables de donnees avancees.',
    demoLink: '/admin',
    color: '#8b5cf6',
    isPremium: true
  },
  {
    id: 'auth-flow',
    title: 'Authentication Flow',
    category: 'Authentication',
    description: 'Pages de connexion, inscription et recuperation de mot de passe avec validation cote client et animations.',
    demoLink: '/auth',
    color: '#ec4899',
    isPremium: true
  },
  {
    id: 'pricing-tables',
    title: 'Pricing Tables',
    category: 'Marketing',
    description: 'Composants de tarification dynamiques avec toggle mensuel/annuel et badges de recommandation.',
    demoLink: '/pricing',
    color: '#3b82f6',
    isPremium: true
  },
  {
    id: 'ecommerce-cards',
    title: 'E-commerce Product Cards',
    category: 'E-commerce',
    description: 'Cartes produits responsives avec selection de couleur, effets au survol et bouton ajout au panier.',
    demoLink: '/ecommerce',
    color: '#f59e0b',
    isPremium: true
  }
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copied, setCopied] = useState(false);

  const openDownloadModal = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
    setCopied(false);
  };

  const copyPrompt = () => {
    const promptText = `Act as an Expert React & Next.js Engineer.
I have downloaded the "${selectedTemplate?.title}" UI template from Lumino.
My current project setup is: [INSERT YOUR PROJECT SETUP HERE - e.g., Next.js 14 App Router, Tailwind/Vanilla CSS].

Please help me integrate this component seamlessly into my project without breaking my existing code.
Follow these rules strictly:
1. Adapt the global CSS variables and design tokens to match my existing theme.
2. Resolve any missing dependencies (like Lucide icons or utility libraries) gracefully.
3. Update the import paths (components, hooks, lib) to match my specific project architecture.
4. Do not overwrite my layout.js, globals.css, or root routing without explicitly asking first.
5. Break down the integration step-by-step so I can review each part.`;

    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <div className={styles.logoMark}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z"/><path d="M12 22v-6.5"/><path d="M22 8.5l-10 7-10-7"/><path d="M2 15.5l10-7 10 7"/></svg>
            </div>
            <span className={styles.logoText}>Lumino</span>
          </div>
          <nav className={styles.navLinks}>
            <a href="#templates" className={styles.navLink}>Templates</a>
            <a href="#how-it-works" className={styles.navLink}>Le Concept</a>
            <a href="#templates" className={styles.navCta}>Explorer</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Composants UI premium, <br/>
              <span className={styles.heroHighlight}>prêts pour la production.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Lumino vous offre des composants React haut de gamme pour concevoir des interfaces d'exception. Gagnez des centaines d'heures de développement avec nos templates prêts à l'emploi et parfaitement optimisés.
            </p>
            <div className={styles.heroButtons}>
              <a href="#templates" className={styles.primaryBtn}>
                Parcourir les templates
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
              </a>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.mockupWindow}>
              <div className={styles.mockupHeader}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.mockupBody}>
                <div className={styles.mockupSidebar}></div>
                <div className={styles.mockupContent}>
                  <div className={styles.mockupLine} style={{width: '60%'}}></div>
                  <div className={styles.mockupLine} style={{width: '85%'}}></div>
                  <div className={styles.mockupBox}></div>
                  <div className={styles.mockupLine} style={{width: '40%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Carousel Section */}
        <section id="templates" className={styles.templatesSection}>
          <div className={styles.sectionHeader}>
            <h2>Templates Populaires</h2>
            <p>Decouvrez nos composants prets a l'emploi. Telechargez le code source complet gratuitement.</p>
          </div>
          
          <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
              {TEMPLATES.map(template => (
                <div key={template.id} className={styles.templateCard}>
                  <div className={styles.templateVisual} style={{ background: `${template.color}15` }}>
                    {TEMPLATE_ICONS[template.id](template.color)}
                    {template.isPremium && (
                      <div className={styles.premiumOverlay}>
                        <div className={styles.lockIcon}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <span>Premium</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.templateInfo}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={styles.templateCategory} style={{ color: template.color }}>{template.category}</span>
                      {template.isPremium && <span className={styles.premiumBadge}>PRO</span>}
                    </div>
                    <h3 className={styles.templateTitle}>{template.title}</h3>
                    <p className={styles.templateDesc}>{template.description}</p>
                    <div className={styles.templateActions}>
                      <Link href={template.demoLink} className={styles.demoBtn}>
                        Voir la demo
                      </Link>
                      {template.isPremium ? (
                        <button className={styles.lockedBtn} onClick={() => alert("Ce template est reserve aux membres Premium.")}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          Debloquer
                        </button>
                      ) : (
                        <button className={styles.downloadBtn} onClick={() => openDownloadModal(template)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Telecharger
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logoMark} style={{width: 20, height: 20}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z"/></svg>
            </div>
            <span>Lumino &copy; {new Date().getFullYear()}</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Github</a>
            <a href="#">Documentation</a>
            <a href="#">X (Twitter)</a>
          </div>
        </div>
      </footer>

      {/* Download & Prompt Modal */}
      {showModal && selectedTemplate && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleArea}>
                <div className={styles.successIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3>Telechargement prepare !</h3>
              </div>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            
            <p className={styles.modalDesc}>
              Vous etes sur le point d'integrer <strong>{selectedTemplate.title}</strong>. Pour assurer une integration parfaite et sans bugs dans votre code existant, utilisez notre Master Class Prompt avec votre IA (ChatGPT, Claude, etc.).
            </p>

            <div className={styles.promptContainer}>
              <div className={styles.promptHeader}>
                <span>Master Class AI Prompt</span>
                <button className={styles.copyBtn} onClick={copyPrompt}>
                  {copied ? 'Copie !' : 'Copier le prompt'}
                </button>
              </div>
              <pre className={styles.promptText}>
{`Act as an Expert React & Next.js Engineer.
I have downloaded the "${selectedTemplate.title}" UI template from Lumino.
My current project setup is: [INSERT YOUR SETUP HERE - e.g. Next.js 14, Tailwind].

Please help me integrate this component seamlessly into my project without breaking my existing code.
Follow these rules strictly:
1. Adapt the global CSS variables and design tokens to match my existing theme.
2. Resolve any missing dependencies (like Lucide icons) gracefully.
3. Update the import paths to match my specific project architecture.
4. Do not overwrite my layout.js, globals.css, or root routing without explicitly asking first.
5. Break down the integration step-by-step so I can review each part.`}
              </pre>
            </div>

            <div className={styles.modalFooter}>
               <a 
                 href={`/downloads/${selectedTemplate.id}.zip`}
                 download={`${selectedTemplate.id}.zip`}
                 className={styles.actualDownloadBtn}
                 style={{ textDecoration: 'none' }}
               >
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                 Telecharger les sources (.zip)
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
