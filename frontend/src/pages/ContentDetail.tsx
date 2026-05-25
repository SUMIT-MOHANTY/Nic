import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../api/client";
import type { Content } from "../types";

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

export default function ContentDetail() {
  const navigate = useNavigate();
  const { contentId } = useParams<{ contentId: string }>();
  const id = contentId ?? "";
  const [data, setData] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    client
      .content(id)
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

  const blocks = useMemo(() => data?.blocks ?? [], [data]);

  if (error) return <div className="errorState">{error}</div>;
  if (!data) return <div className="loadingState">Loading…</div>;

  return (
    <div className="screen">
      <div className="detailHeader">
        <button type="button" className="linkButton" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <div className="contentCard">
        <div className="contentTitle">{data.title}</div>
        {data.subtitle ? <div className="contentSubtitle">{data.subtitle}</div> : null}
        {blocks.map((b, idx) => {
          const type = String((b as Record<string, unknown>).type ?? "");
          if (type === "tips") return <TipsBlock key={idx} block={b as Record<string, unknown>} />;
          if (type === "paragraph")
            return (
              <p key={idx} className="para">
                {String((b as Record<string, unknown>).text ?? "")}
              </p>
            );
          return null;
        })}
      </div>
    </div>
  );
}
