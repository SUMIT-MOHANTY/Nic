import { useState, useEffect } from "react";

interface EmergencyCravingProps {
  isOpen: boolean;
  onClose: () => void;
  onLogged: (intensity: string, trigger: string) => void;
}

export default function EmergencyCraving({ isOpen, onClose, onLogged }: EmergencyCravingProps) {
  const [phase, setPhase] = useState<"log" | "breath" | "success">("log");
  const [intensity, setIntensity] = useState<"Mild" | "Moderate" | "Severe">("Moderate");
  const [trigger, setTrigger] = useState("After Meals");
  
  // Breathing animation states
  const [breathState, setBreathState] = useState<"In" | "Hold" | "Out">("In");
  const [breathTimer, setBreathTimer] = useState(60);
  const [pulsingScale, setPulsingScale] = useState(1);

  const triggers = ["After Meals", "Tea/Coffee Break", "Work Stress", "Friends/Peer Pressure", "Boredom"];

  // Handle guided breathing cycle
  useEffect(() => {
    if (phase !== "breath") return;

    // 60-second overall countdown
    const overallTimer = setInterval(() => {
      setBreathTimer(prev => {
        if (prev <= 1) {
          clearInterval(overallTimer);
          setPhase("success");
          onLogged(intensity, trigger);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 4-second breathing pattern: In (4s), Hold (4s), Out (4s)
    let cycleCount = 0;
    const breathingCycle = setInterval(() => {
      cycleCount = (cycleCount + 1) % 3;
      if (cycleCount === 0) {
        setBreathState("In");
        setPulsingScale(1.4);
      } else if (cycleCount === 1) {
        setBreathState("Hold");
        setPulsingScale(1.4);
      } else {
        setBreathState("Out");
        setPulsingScale(1.0);
      }
    }, 4000);

    // Initial scale action
    setPulsingScale(1.4);

    return () => {
      clearInterval(overallTimer);
      clearInterval(breathingCycle);
    };
  }, [phase]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: 'white'
    }}>
      
      {/* Container */}
      <div style={{
        background: '#1e293b',
        borderRadius: '24px',
        padding: '32px 24px',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        textAlign: 'center'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            display: 'grid',
            placeItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        {phase === "log" && (
          <div>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>⚠️</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'white' }}>Log Your Craving</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
              Acknowledging the urge is the first step to beating it. Tell us how you feel.
            </p>

            {/* Intensity Selector */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Urge Intensity
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {(["Mild", "Moderate", "Severe"] as const).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setIntensity(lvl)}
                    style={{
                      padding: '12px 6px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: '1.5px solid',
                      borderColor: intensity === lvl ? 'var(--brand-light)' : 'rgba(255,255,255,0.1)',
                      background: intensity === lvl ? 'rgba(45, 212, 191, 0.2)' : 'transparent',
                      color: intensity === lvl ? 'var(--brand-light)' : '#cbd5e1'
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Selector */}
            <div style={{ marginBottom: '28px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Chewing Trigger
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {triggers.map(trig => (
                  <button
                    key={trig}
                    type="button"
                    onClick={() => setTrigger(trig)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: trigger === trig ? 'var(--brand-light)' : 'rgba(255,255,255,0.1)',
                      background: trigger === trig ? 'rgba(45, 212, 191, 0.1)' : 'transparent',
                      color: trigger === trig ? 'var(--brand-light)' : '#94a3b8'
                    }}
                  >
                    {trig}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setPhase("breath")}
              className="primaryButton"
              style={{ width: '100%', padding: '16px', background: 'var(--brand)', color: 'white' }}
            >
              Start Breathing Reset
            </button>
          </div>
        )}

        {phase === "breath" && (
          <div style={{ padding: '8px 0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>60-Second Reset</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px' }}>
              Sync your breathing with the circle below. Relax your jaw.
            </p>

            {/* Breathing Animation Circle */}
            <div style={{
              width: '180px',
              height: '180px',
              margin: '0 auto 28px',
              position: 'relative',
              display: 'grid',
              placeItems: 'center'
            }}>
              {/* Outer pulsing ring */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'rgba(45, 212, 191, 0.15)',
                transform: `scale(${pulsingScale})`,
                transition: 'transform 4s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />

              {/* Inner core circle */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand), var(--brand-light))',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(45, 212, 191, 0.4)',
                zIndex: 2
              }}>
                <span style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {breathState}
                </span>
                <span style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>
                  {breathState === "In" ? "Fill your lungs" : breathState === "Hold" ? "Stay relaxed" : "Release stress"}
                </span>
              </div>
            </div>

            {/* Countdown timer */}
            <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--brand-light)', marginBottom: '8px' }}>
              {breathTimer}s
            </div>

            <p style={{ fontSize: '13px', color: '#cbd5e1', fontStyle: 'italic', margin: '0 0 16px 0' }}>
              💡 Saunf (Fennel) / Elaichi (Cardamom) / Clove alternative: Put a pinch in your mouth now to satisfy the oral fixation.
            </p>
          </div>
        )}

        {phase === "success" && (
          <div>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🎉</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'white' }}>Craving Defeated!</h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '24px', lineHeight: 1.4 }}>
              Sensational job! You chose guided relaxation instead of tobacco. This has been logged, adding to your overall resilience streak.
            </p>

            <div style={{
              background: 'rgba(45, 212, 191, 0.1)',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: '16px',
              padding: '16px',
              fontSize: '13px',
              color: 'var(--brand-light)',
              fontWeight: 600,
              marginBottom: '28px',
              textAlign: 'left'
            }}>
              📈 **Resilience Streak:** Your risk of OSMF and gum disease decreases with every craving you successfully bypass.
            </div>

            <button
              onClick={onClose}
              className="primaryButton"
              style={{ width: '100%', padding: '16px', background: 'var(--brand)', color: 'white' }}
            >
              Continue Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
