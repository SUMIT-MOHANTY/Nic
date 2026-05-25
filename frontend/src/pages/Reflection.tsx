import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { client } from "../api/client";
import type { DayDetail } from "../types";

function clampDay(n: number) {
  if (Number.isNaN(n)) return 1;
  return Math.min(7, Math.max(1, n));
}

export default function Reflection() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const day = useMemo(() => clampDay(Number(params.get("day") ?? "1")), [params]);

  const [journey, setJourney] = useState<DayDetail | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    client
      .journey(day)
      .then((d) => {
        if (cancelled) return;
        setJourney(d);
        setText(d.reflection.text ?? "");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, [day]);

  if (error) return <div className="errorState">{error}</div>;
  if (!journey) return <div className="loadingState">Loading…</div>;

  async function submit() {
    setBusy(true);
    try {
      await client.submitReflection(journey!.week, journey!.day, text.trim());
      navigate(-1);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="screen">
      <div className="pageHeader" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate(-1)}
          className="iconButton"
          style={{ width: '40px', height: '40px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div>
          <div className="pageTitle" style={{ fontSize: '24px' }}>Daily Reflection</div>
          <div className="pageSubtitle">Day {journey.day} Journey</div>
        </div>
      </div>

      {journey.reflection.locked ? (
        <div className="lockedBanner" style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔒</div>
          <div style={{ fontWeight: 800 }}>Reflection Locked</div>
          <div style={{ opacity: 0.8, fontSize: '13px', marginTop: '4px' }}>Complete today's tasks first to unlock this section.</div>
        </div>
      ) : (
        <div className="contentCard" style={{ padding: '28px' }}>
          <label className="fieldLabel" style={{ fontSize: '16px', marginBottom: '12px' }}>
            How are you feeling today?
          </label>
          <textarea
            className="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts, challenges, or victories... We're here to listen."
            rows={8}
            style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '20px',
              padding: '16px',
              fontSize: '15px'
            }}
          />
          <button
            type="button"
            className="primaryButton"
            style={{ width: '100%', marginTop: '24px' }}
            disabled={busy || text.trim().length === 0}
            onClick={submit}
          >
            {busy ? "Saving Thoughts..." : "Save Reflection"}
          </button>
        </div>
      )}
    </div>
  );
}


