import AdminLayout from '@/components/templates/admin/AdminLayout';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          <p className={styles.pageSubtitle}>Bienvenue, voici un resume de vos activites.</p>
        </div>
        <Link href="/" className={styles.backLink}>
          Retour a Lumino
        </Link>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {[
          {
            label: 'Revenus Total',
            value: '$24,500',
            trend: '+14%',
            color: '#10b981',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            ),
            iconBg: '#10b98115'
          },
          {
            label: 'Nouveaux Utilisateurs',
            value: '1,240',
            trend: '+5%',
            color: '#3b82f6',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            ),
            iconBg: '#3b82f615'
          },
          {
            label: 'Ventes du mois',
            value: '342',
            trend: '-2%',
            color: '#ef4444',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            ),
            iconBg: '#ef444415'
          },
          {
            label: 'Taux de conversion',
            value: '3.4%',
            trend: '+1.2%',
            color: '#10b981',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            ),
            iconBg: '#f59e0b15'
          },
        ].map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statHeader}>
              <p className={styles.statLabel}>{stat.label}</p>
              <div className={styles.statIcon} style={{ background: stat.iconBg }}>
                {stat.icon}
              </div>
            </div>
            <div className={styles.statValue}>
              <h3>{stat.value}</h3>
              <span style={{ color: stat.color }}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Dernieres Transactions</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sarah Connor', date: 'Oct 24, 2026', amount: '$120.00', status: 'Reussi', statusColor: '#10b981', statusBg: '#d1fae5' },
                  { name: 'John Doe', date: 'Oct 23, 2026', amount: '$45.00', status: 'En attente', statusColor: '#f59e0b', statusBg: '#fef3c7' },
                  { name: 'Marie Curie', date: 'Oct 22, 2026', amount: '$299.00', status: 'Reussi', statusColor: '#10b981', statusBg: '#d1fae5' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className={styles.clientName}>{row.name}</td>
                    <td className={styles.dateCell}>{row.date}</td>
                    <td className={styles.amountCell}>{row.amount}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ color: row.statusColor, background: row.statusBg }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Activites Recentes</h3>
          <div className={styles.activityList}>
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                ),
                iconBg: '#8b5cf615',
                text: 'Nouvelle version de Lumino',
                time: 'Il y a 2h'
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                ),
                iconBg: '#10b98115',
                text: 'Paiement recu de $120.00',
                time: 'Il y a 4h'
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                ),
                iconBg: '#3b82f615',
                text: 'Nouvel utilisateur inscrit',
                time: 'Il y a 5h'
              },
            ].map((activity, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityIcon} style={{ background: activity.iconBg }}>
                  {activity.icon}
                </div>
                <div>
                  <p className={styles.activityText}>{activity.text}</p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
