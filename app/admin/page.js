import AdminLayout from '@/components/templates/admin/AdminLayout';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
          <p style={{ color: '#64748b' }}>Bienvenue, voici un resume de vos activites.</p>
        </div>
        <Link href="/" style={{ padding: '0.5rem 1rem', background: '#e2e8f0', color: '#0f172a', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem' }}>
          Retour a Lumino
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Revenus Total', value: '$24,500', trend: '+14%', color: '#10b981' },
          { label: 'Nouveaux Utilisateurs', value: '1,240', trend: '+5%', color: '#3b82f6' },
          { label: 'Ventes du mois', value: '342', trend: '-2%', color: '#ef4444' },
          { label: 'Taux de conversion', value: '3.4%', trend: '+1.2%', color: '#10b981' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>{stat.label}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{stat.value}</h3>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: stat.color }}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Dernieres Transactions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.875rem' }}>
                <th style={{ paddingBottom: '1rem' }}>Client</th>
                <th style={{ paddingBottom: '1rem' }}>Date</th>
                <th style={{ paddingBottom: '1rem' }}>Montant</th>
                <th style={{ paddingBottom: '1rem' }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Sarah Connor', date: 'Oct 24, 2026', amount: '$120.00', status: 'Reussi', statusColor: '#10b981', statusBg: '#d1fae5' },
                { name: 'John Doe', date: 'Oct 23, 2026', amount: '$45.00', status: 'En attente', statusColor: '#f59e0b', statusBg: '#fef3c7' },
                { name: 'Marie Curie', date: 'Oct 22, 2026', amount: '$299.00', status: 'Reussi', statusColor: '#10b981', statusBg: '#d1fae5' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: i !== 2 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#0f172a' }}>{row.name}</td>
                  <td style={{ padding: '1rem 0', color: '#64748b', fontSize: '0.875rem' }}>{row.date}</td>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#0f172a' }}>{row.amount}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, color: row.statusColor, background: row.statusBg }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Activites Recentes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🚀', text: 'Nouvelle version de Lumino', time: 'Il y a 2h' },
              { icon: '💳', text: 'Paiement recu de $120.00', time: 'Il y a 4h' },
              { icon: '👤', text: 'Nouvel utilisateur inscrit', time: 'Il y a 5h' },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                  {activity.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.875rem', color: '#0f172a' }}>{activity.text}</p>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
