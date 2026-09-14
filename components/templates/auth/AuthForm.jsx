'use client';
import { useState } from 'react';
import styles from './AuthForm.module.css';
import Link from 'next/link';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.authHeader}>
          <div className={styles.logoMark}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z"/></svg>
          </div>
          <h2>{isLogin ? 'Bon retour parmi nous' : 'Creer un compte'}</h2>
          <p>{isLogin ? 'Entrez vos identifiants pour acceder a votre espace.' : 'Rejoignez la communaute Lumino des aujourd\'hui.'}</p>
        </div>

        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Nom complet</label>
              <input type="text" placeholder="John Doe" required />
            </div>
          )}
          <div className={styles.inputGroup}>
            <label>Adresse e-mail</label>
            <input type="email" placeholder="john@example.com" required />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label>Mot de passe</label>
              {isLogin && <a href="#" className={styles.forgotLink}>Mot de passe oublie ?</a>}
            </div>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>Ou continuer avec</span>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.socialBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            Github
          </button>
          <button className={styles.socialBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            Facebook
          </button>
        </div>

        <div className={styles.footerText}>
          {isLogin ? 'Vous n\'avez pas de compte ? ' : 'Vous avez deja un compte ? '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className={styles.switchBtn}>
            {isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/" className={styles.forgotLink}>Retour a Lumino</Link>
        </div>
      </div>
    </div>
  );
}
