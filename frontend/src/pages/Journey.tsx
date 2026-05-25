import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DaySelector from "../components/DaySelector";
import ReflectionCard from "../components/ReflectionCard";
import TaskCarousel from "../components/TaskCarousel";
import { client } from "../api/client";
import type { DayDetail } from "../types";

function clampDay(n: number) {
  if (Number.isNaN(n)) return 1;
  return Math.min(7, Math.max(1, n));
}

export default function Journey() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const dayFromUrl = useMemo(() => {
    const raw = params.get("day");
    return raw ? clampDay(Number(raw)) : undefined;
  }, [params]);

  const [data, setData] = useState<DayDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    client
      .journey(dayFromUrl)
      .then((d) => {
        if (cancelled) return;
        setData(d);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, [dayFromUrl]);

  if (error) return <div className="errorState">{error}</div>;
  if (!data) return <div className="loadingState">Loading…</div>;

  const selectedDay = data.day;

  return (
    <div className="screen">
      <div className="pageHeader" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate('/')}
          className="iconButton"
          style={{ width: '40px', height: '40px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div>
          <div className="pageTitle" style={{ fontSize: '24px' }}>{data.step.name}</div>
          <div className="pageSubtitle">{data.step.subtitle}</div>
        </div>
      </div>

      <DaySelector
        days={data.days}
        selectedDay={selectedDay}
        onSelect={(d) => {
          setParams((prev) => {
            prev.set("day", String(d));
            return prev;
          });
        }}
      />

      <div className="tasksSummaryRow" style={{ margin: '32px 0 16px' }}>
        <div className="tasksSummaryTitle" style={{ fontSize: '20px' }}>Day {selectedDay} Tasks</div>
        <div className="badge">
          {data.completedTasks} / {data.totalTasks} Done
        </div>
      </div>

      <TaskCarousel tasks={data.tasks} onOpenTask={(id) => navigate(`/task/${id}`)} />

      <div style={{ height: '32px' }} />

      <ReflectionCard
        locked={data.reflection.locked}
        completed={data.reflection.completed}
        onOpen={() => navigate(`/reflection?day=${selectedDay}`)}
      />
    </div>
  );
}


