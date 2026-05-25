export default function Shop() {
  const categories = [
    { name: "Gums", count: 12, icon: "🍬", color: "#fef3c7" },
    { name: "Patches", count: 5, icon: "🩹", color: "#ecfeff" },
    { name: "Lozenge", count: 8, icon: "💊", color: "#f0fdf4" },
    { name: "Plans", count: 3, icon: "📋", color: "#fdf2f8" },
  ];

  return (
    <div className="screen">
      <div className="pageHeader" style={{ marginBottom: '32px' }}>
        <div className="pageTitle">Wellness Store</div>
        <div className="pageSubtitle">Supplies to help you stay on track</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {categories.map(cat => (
          <div key={cat.name} className="detailCard" style={{ 
            padding: '24px', 
            background: cat.color,
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cat.icon}</div>
            <div className="detailTitle" style={{ fontSize: '18px' }}>{cat.name}</div>
            <div className="muted">{cat.count} items</div>
          </div>
        ))}
      </div>

      <div className="section" style={{ marginTop: '40px' }}>
        <div className="sectionTitle">Recommended for You</div>
        <div className="detailCard" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px' }}>
          <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '16px', display: 'grid', placeItems: 'center', fontSize: '32px' }}>📦</div>
          <div style={{ flex: 1 }}>
            <div className="detailTitle" style={{ fontSize: '16px' }}>Nicotex Starter Kit</div>
            <div className="muted">2 Weeks Supply • 4mg</div>
            <div style={{ marginTop: '8px', fontWeight: 800, color: 'var(--brand)' }}>₹ 499.00</div>
          </div>
          <button className="pillButton">Add</button>
        </div>
      </div>
    </div>
  );
}


