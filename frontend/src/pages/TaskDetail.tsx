import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../api/client";
import type { TaskDetailResponse } from "../types";
import { formatDuration } from "../utils/format";

function TipsBlock({ block }: { block: Record<string, unknown> }) {
  const items = (block.items as Array<Record<string, unknown>> | undefined) ?? [];
  return (
    <div className="tipsList">
      {items.map((it, idx) => (
        <div className="tipCard" key={idx}>
          <div className="tipTitle">{String(it.title ?? "")}</div>
          <div className="tipText">{String(it.text ?? "")}</div>
        </div>
      ))}
    </div>
  );
}

export default function TaskDetail() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const id = taskId ?? "";

  const [data, setData] = useState<TaskDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [scheduledFor, setScheduledFor] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    client
      .task(id)
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
  }, [id]);

  const blocks = useMemo(() => data?.content?.blocks ?? [], [data]);

  if (error) return <div className="errorState">{error}</div>;
  if (!data) return <div className="loadingState">Loading…</div>;

  const task = data.task;

  async function markDone() {
    setBusy(true);
    try {
      await client.completeTask(task.id);
      navigate(-1);
    } finally {
      setBusy(false);
    }
  }

  async function schedule() {
    if (!scheduledFor) return;
    setBusy(true);
    try {
      await client.scheduleCall(task.id, scheduledFor);
      navigate(-1);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="screen">
      <div className="detailHeader">
        <button type="button" className="linkButton" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="detailCard">
        <div className="detailTitle">{task.title}</div>
        <div className="detailMeta">
          <span className="badge">{task.kind.toUpperCase()}</span>
          <span className="muted">{formatDuration(task.durationSeconds)}</span>
        </div>
        <div className="detailDesc">{task.description}</div>
      </div>

      {task.kind === "call" ? (
        <div className="callCard">
          <div className="callTitle">Schedule your Free 45 mins Call with Expert</div>
          <div className="callSub">
            Enjoy your free 7-day trial, available once for new users to experience your personalised quit journey.
          </div>
          <label className="fieldLabel">
            Pick date & time
            <input
              type="datetime-local"
              className="input"
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
            />
          </label>
          <button type="button" className="primaryButton wide" disabled={!scheduledFor || busy} onClick={schedule}>
            {busy ? "Scheduling…" : "Schedule Now"}
          </button>
        </div>
      ) : null}

      {task.kind !== "call" ? (
        <div className="contentCard">
          <div className="contentTitle">{data.content?.title ?? "Content"}</div>
          {data.content?.subtitle ? <div className="contentSubtitle">{data.content.subtitle}</div> : null}
          {blocks.map((b, idx) => {
            const type = String(b.type ?? "");
            if (type === "tips") return <TipsBlock key={idx} block={b} />;
            if (type === "paragraph") return <p key={idx} className="para">{String(b.text ?? "")}</p>;
            return null;
          })}
          <button type="button" className="primaryButton wide" disabled={busy} onClick={markDone}>
            {busy ? "Saving…" : task.completed ? "Done" : "Mark as done"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

