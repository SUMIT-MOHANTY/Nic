import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../api/client";
import type { OverviewResponse } from "../types";
import WeekStrip from "../components/WeekStrip";

function timeGreeting(now: Date) {
  const h = now.getHours();
  if (h >= 5 && h < 12) return { text: "Good Morning", icon: "☀️" };
  if (h >= 12 && h < 17) return { text: "Good Afternoon", icon: "🌤️" };
  if (h >= 17 && h < 21) return { text: "Good Evening", icon: "🌅" };
  return { text: "Good Night", icon: "🌙" };
}

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    client
      .overview()
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
  }, []);

  const greeting = useMemo(() => timeGreeting(new Date()), []);

  if (error) return <div className="errorState">{error}</div>;
  if (!data) return <div className="loadingState">Loading…</div>;

  const weekComplete = data.weekDays.every((d) => d.totalTasks === 0 || d.completedTasks >= d.totalTasks);
  const unlockText = weekComplete
    ? "Week 1 is unlocked. Keep going! 🎉"
    : "Complete first Week tasks to unlock Week 1 🗝️";

  return (
    <div className="screen">
      <div className="hero">
        <div className="heroTitle">
          <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>
            {greeting.icon} {greeting.text}
          </span>
          {data.user.name}!
        </div>
        
        <div className="heroCard">
          <div className="heroRow">
            <div className="heroMeta">
              <span className="heroMetaLabel">Your Progress</span>
              <span className="heroMetaValue">
                Week {data.program.currentWeek} <span className="heroMetaSub">of {data.program.totalWeeks}</span>
              </span>
            </div>
            <div className="heroMeta right">
              <span className="heroMetaLabel">Journey Day</span>
              <span className="heroMetaValue">
                {data.program.currentDay}
                <span className="heroMetaSub">/{data.program.daysInWeek}</span>
              </span>
            </div>
          </div>

          <WeekStrip days={data.weekDays} selectedDay={data.program.currentDay} />

          <div className={`unlockBanner ${weekComplete ? "ok" : ""}`}>{unlockText}</div>

          <div className="tasksLeftRow">
            {data.todayTasksLeft > 0 ? (
              <span>🔥 <b>{data.todayTasksLeft}</b> tasks left for today!</span>
            ) : (
              <span>✨ All caught up for today!</span>
            )}
          </div>
        </div>

        <div className="stepCard">
          <div className="stepCardIcon" aria-hidden="true">
             <div className="stepIconBg" />
          </div>
          <div className="stepCardInfo">
            <div className="stepCardTitle">{data.step.name}</div>
            <div className="stepCardSub">
              {data.todayCompletedTasks} of {data.todayTotalTasks} Tasks Completed
            </div>
          </div>
          <button
            type="button"
            className="primaryButton"
            onClick={() => navigate(`/journey?day=${data.program.currentDay}`)}
          >
            Start Your Session
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <div className="section">
        <div className="sectionTitle">Premium Insights</div>
        <div className="learnRow">
          {data.learnCards.map((c) => (
            <button
              key={c.id}
              type="button"
              className="learnCard"
              onClick={() => navigate(`/content/${c.contentId}`)}
            >
              <div className="learnTitle">{c.title}</div>
              <div className="learnSub">{c.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


