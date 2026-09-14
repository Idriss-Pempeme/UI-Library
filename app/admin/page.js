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
          { label: 'Revenus Total', value: '$24,500', trend: '+14%', color: '#10b981' },
          { label: 'Nouveaux Utilisateurs', value: '1,240', trend: '+5%', color: '#3b82f6' },
          { label: 'Ventes du mois', value: '342', trend: '-2%', color: '#ef4444' },
          { label: 'Taux de conversion', value: '3.4%', trend: '+1.2%', color: '#10b981' },
        ].map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <p className={styles.statLabel}>{stat.label}</p>
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
              { icon: '🚀', text: 'Nouvelle version de Lumino', time: 'Il y a 2h' },
              { icon: '💳', text: 'Paiement recu de $120.00', time: 'Il y a 4h' },
              { icon: '👤', text: 'Nouvel utilisateur inscrit', time: 'Il y a 5h' },
            ].map((activity, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityIcon}>
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
