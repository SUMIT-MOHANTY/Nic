import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "Anshul Saxena",
    chewProduct: "Gutkha",
    ftndScore: "7",
    dependenceLevel: "Moderate Dependence",
    dailyCost: "50",
    quitDate: ""
  });

  useEffect(() => {
    const assessmentCompleted = localStorage.getItem("assessment_completed");
    if (assessmentCompleted === "true") {
      setProfile({
        name: localStorage.getItem("user_name") || "Anshul Saxena",
        chewProduct: localStorage.getItem("chew_product") || "Gutkha",
        ftndScore: localStorage.getItem("ftnd_score") || "7",
        dependenceLevel: localStorage.getItem("dependence_level") || "Moderate Dependence",
        dailyCost: localStorage.getItem("daily_cost") || "50",
        quitDate: localStorage.getItem("quit_date") || ""
      });
    }
  }, []);

  // Compute stats dynamically: default days quit is 14 if no quit date, or days since quit date
  let daysQuit = 14;
  if (profile.quitDate) {
    const qd = new Date(profile.quitDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - qd.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (now >= qd) {
      daysQuit = diffDays;
    }
  }

  const dailyCostNum = parseInt(profile.dailyCost) || 50;
  // Estimate pouches saved based on daily cost (assume avg ₹5 per pouch)
  const pouchesSaved = daysQuit * Math.ceil(dailyCostNum / 5);
  const totalMoneySaved = daysQuit * dailyCostNum;

  const stats = [
    { label: "Days Tobacco Free", value: daysQuit.toString(), color: "#f0fdf4" },
    { label: "Pouches Saved", value: pouchesSaved.toString(), color: "#ecfeff" },
    { label: "Money Saved", value: `₹ ${totalMoneySaved.toLocaleString()}`, color: "#fef3c7" },
  ];

  return (
    <div className="screen">
      <div className="pageHeader" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand), var(--brand-light))', display: 'grid', placeItems: 'center', fontSize: '40px', color: 'white', marginBottom: '16px', boxShadow: 'var(--shadow-premium)' }}>👤</div>
        <div className="pageTitle">{profile.name}</div>
        <div className="pageSubtitle" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
          <span style={{ fontSize: '12px', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--brand)', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
            {profile.chewProduct} User
          </span>
          <span style={{ fontSize: '12px', background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
            {profile.dependenceLevel}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: s.color, padding: '16px 8px', borderRadius: '20px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>{s.value}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Nicotine Dependence Profile Card */}
      <div className="detailCard" style={{ padding: '20px', background: 'white', borderRadius: 'var(--radius-lg)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', margin: 0 }}>Nicotine Dependence</h3>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand)' }}>{profile.ftndScore} / 11 Pts</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
          Your score indicates <b>{profile.dependenceLevel}</b>. Retaking the assessment will adjust your daily targets and cravings plan.
        </p>
        <button 
          type="button"
          onClick={() => navigate("/assessment")}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--brand)',
            color: 'var(--brand)',
            fontWeight: 800,
            fontSize: '13px',
            textAlign: 'center',
            background: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--brand)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--brand)';
          }}
        >
          Retake Diagnostic Assessment
        </button>
      </div>

      <div className="section">
        <div className="sectionTitle">Account Settings</div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {['Personal Information', 'Journey Preferences', 'Notifications', 'Subscription Plan', 'Help & Support'].map(item => (
            <div key={item} className="detailCard" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
              <div style={{ fontWeight: 700, color: '#334155' }}>{item}</div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}><path d="m9 18 6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        type="button"
        className="primaryButton" 
        style={{ width: '100%', marginTop: '24px', background: '#fee2e2', color: '#b91c1c', boxShadow: 'none' }}
      >
        Sign Out
      </button>
    </div>
  );
}
