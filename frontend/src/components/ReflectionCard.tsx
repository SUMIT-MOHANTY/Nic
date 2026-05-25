import LockIcon from "./icons/LockIcon";

export default function ReflectionCard({
  locked,
  completed,
  onOpen
}: {
  locked: boolean;
  completed: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`reflectionCard ${locked ? "locked" : ""}`}
      onClick={onOpen}
      disabled={locked}
      style={{
        background: locked ? 'var(--surface)' : 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: locked ? 'var(--text)' : 'white',
        border: locked ? '1px solid var(--glass-border)' : 'none',
        opacity: 1
      }}
    >
      <div className="reflectionHeader">
        <div style={{ flex: 1 }}>
          <div className="reflectionTitle" style={{ fontSize: '20px', fontWeight: 800 }}>Daily Reflection</div>
          <div className="reflectionSubtitle" style={{ 
            marginTop: '8px', 
            opacity: locked ? 0.6 : 0.8,
            fontSize: '13px',
            lineHeight: '1.4'
          }}>
            Capture your journey and emotions. We'll guide you through each milestone.
          </div>
        </div>
        <div style={{ marginLeft: '16px' }}>
          {locked ? (
            <span className="lockIcon" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--muted)' }}>
              <LockIcon />
            </span>
          ) : completed ? (
            <span className="reflectionDone" style={{ background: 'rgba(45, 212, 191, 0.2)', color: '#2dd4bf', padding: '8px 16px', borderRadius: '12px' }}>
              ✨ Completed
            </span>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '14px' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}


