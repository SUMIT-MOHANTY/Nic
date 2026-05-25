import { useState } from "react";

export default function OralScreening() {
  const [examStep, setExamStep] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: "Healthy" | "Attention" | "High Risk";
    message: string;
    details: string;
    color: string;
    bg: string;
  } | null>(null);

  const steps = [
    {
      title: "1. Inside Cheek Check",
      desc: "Gently pull your cheek outward. Look for any thick white patches (leukoplakia), bright red velvety patches, or rough mucosal bands.",
      tip: "💡 Healthy cheeks should be smooth, pink, and wet.",
      action: "Next Step"
    },
    {
      title: "2. The Jaw Opening Finger-Test",
      desc: "Try putting 3 or 4 fingers vertically between your upper and lower teeth. If you struggle or feel pain/stiffness, this may indicate Oral Submucous Fibrosis (OSMF).",
      tip: "💡 OSMF is a chronic condition highly associated with chewable tobacco (Gutkha).",
      action: "Next Step"
    },
    {
      title: "3. Tongue & Gums Inspection",
      desc: "Stick your tongue out. Look at the sides and underneath. Inspect gums for persistent bleeding, red sores, or ulcers that don't heal in 10-14 days.",
      tip: "💡 Oral cancer commonly initiates on the sides of the tongue.",
      action: "Start Photo Upload"
    }
  ];

  const handleNextExam = () => {
    if (examStep < steps.length - 1) {
      setExamStep(prev => prev + 1);
    } else {
      setExamStep(steps.length); // Proceed to photo scan
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerScan = () => {
    if (!photo) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      // Determine simulation result based on mock analysis
      setScanResult({
        status: "Attention",
        message: "Potential Mucosal Changes Detected",
        details: "AI analysis detected standard white-patch lining characteristics near the lower gums. This resembles early leukoplakia mucosal changes. Jaw movement stiffness indicates early OSMF risk.",
        color: "#d97706",
        bg: "#fef3c7"
      });
    }, 3000);
  };

  return (
    <div className="screen">
      <div className="pageHeader" style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Clinical Prevention Module
        </span>
        <h1 className="pageTitle">Oral Cancer Self-Screening</h1>
        <p className="pageSubtitle">Inspect mouth lining for Gutkha/Khaini related changes.</p>
      </div>

      {examStep < steps.length ? (
        // Self-Examination Interactive Slides
        <div className="detailCard" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-premium)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase' }}>
              STEP {examStep + 1} OF {steps.length}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {steps.map((_, idx) => (
                <div key={idx} style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: examStep === idx ? 'var(--brand)' : '#e2e8f0'
                }} />
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '12px' }}>
            {steps[examStep].title}
          </h2>
          
          <p style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.5 }}>
            {steps[examStep].desc}
          </p>

          <div style={{
            background: '#f8fafc',
            borderLeft: '4px solid var(--brand)',
            padding: '12px 16px',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontSize: '13px',
            color: 'var(--muted)',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: '28px'
          }}>
            {steps[examStep].tip}
          </div>

          <button
            type="button"
            className="primaryButton"
            onClick={handleNextExam}
            style={{ width: '100%', padding: '16px', fontSize: '14px' }}
          >
            {steps[examStep].action}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </div>
      ) : (
        // Photo Upload & AI Screening Simulation Screen
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Diagnostic upload box */}
          <div className="detailCard" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>
              Simulated Oral Cavity AI Scanner
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '24px' }}>
              Upload a clear close-up image of the inside cheek or gums.
            </p>

            {!photo ? (
              <div style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '16px',
                padding: '40px 20px',
                background: '#f8fafc',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    opacity: 0, cursor: 'pointer'
                  }}
                />
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>📷</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand)' }}>
                  Capture or Upload Photo
                </span>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '4px' }}>
                  PNG, JPG up to 5MB
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '16px', overflow: 'hidden', border: '3px solid var(--brand)', marginBottom: '20px' }}>
                  <img src={photo} alt="Uploaded cavity" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  
                  {scanning && (
                    // Scanning line animation
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, height: '4px',
                      background: 'var(--brand-light)',
                      boxShadow: '0 0 10px var(--brand-light)',
                      animation: 'scanLine 1.5s infinite linear'
                    }} />
                  )}
                </div>

                {scanning ? (
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand)', animation: 'pulse 1.2s infinite' }}>
                    🤖 AI is analyzing mucosal tissues...
                  </div>
                ) : !scanResult ? (
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <button 
                      onClick={() => setPhoto(null)} 
                      style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}
                    >
                      Retake
                    </button>
                    <button 
                      onClick={triggerScan}
                      className="primaryButton"
                      style={{ flex: 2, padding: '12px', borderRadius: '12px', fontSize: '13px' }}
                    >
                      Start AI Analysis
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* AI scan results display */}
          {scanResult && (
            <div className="detailCard" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', borderLeft: `6px solid ${scanResult.color}`, boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '12px', background: scanResult.bg, color: scanResult.color, fontSize: '12px', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase' }}>
                {scanResult.status} Required
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', margin: '0 0 8px 0' }}>
                {scanResult.message}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                {scanResult.details}
              </p>
              
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', fontSize: '11px', color: 'var(--muted)', fontWeight: 600, border: '1px solid #e2e8f0' }}>
                ⚠️ **CESSATION DISCLAIMER:** This is an AI education assistant and not a medical replacement. If red/white patches persist for more than 14 days, please see a qualified dental doctor immediately.
              </div>
            </div>
          )}

          {/* Educational Comparison Card */}
          <div className="detailCard" style={{ padding: '20px', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              Comparison Guide
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px', border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand)', display: 'block', marginBottom: '4px' }}>
                  Normal Mucosa
                </span>
                <span style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.4, display: 'block' }}>
                  Cheek is pink, stretchy, smooth with zero sores or hard spots.
                </span>
              </div>
              <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '12px', border: '1px solid rgba(220, 38, 38, 0.1)' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#dc2626', display: 'block', marginBottom: '4px' }}>
                  Warning Signs
                </span>
                <span style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.4, display: 'block' }}>
                  Velvety red, hard white patch, or thick fibrous lines that block finger movement.
                </span>
              </div>
            </div>
          </div>

          {/* Reset Self Exam button */}
          <button 
            type="button"
            onClick={() => { setExamStep(0); setPhoto(null); setScanResult(null); }}
            style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--brand)', color: 'var(--brand)', fontWeight: 800, fontSize: '13px', background: 'transparent' }}
          >
            ← Restart Self-Examination Slides
          </button>
        </div>
      )}

      {/* Embedded Scan Animations CSS */}
      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
