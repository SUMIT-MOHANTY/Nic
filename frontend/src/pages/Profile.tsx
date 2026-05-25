export default function Profile() {
  const stats = [
    { label: "Days Smoke Free", value: "14", color: "#f0fdf4" },
    { label: "Cigarettes Saved", value: "280", color: "#ecfeff" },
    { label: "Money Saved", value: "₹ 2,400", color: "#fef3c7" },
  ];

  return (
    <div className="screen">
      <div className="pageHeader" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand), var(--brand-light))', display: 'grid', placeItems: 'center', fontSize: '40px', color: 'white', marginBottom: '16px', boxShadow: 'var(--shadow-premium)' }}>👤</div>
        <div className="pageTitle">Anshul Saxena</div>
        <div className="pageSubtitle">Level 4 Wellness Achiever</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: s.color, padding: '16px 8px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>{s.value}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--muted)', marginTop: '4px', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="sectionTitle">Account Settings</div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {['Personal Information', 'Journey Preferences', 'Notifications', 'Subscription Plan', 'Help & Support'].map(item => (
            <div key={item} className="detailCard" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, color: '#334155' }}>{item}</div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}><path d="m9 18 6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>
      
      <button className="primaryButton" style={{ width: '100%', marginTop: '32px', background: '#fee2e2', color: '#b91c1c', boxShadow: 'none' }}>
        Sign Out
      </button>
    </div>
  );
}


