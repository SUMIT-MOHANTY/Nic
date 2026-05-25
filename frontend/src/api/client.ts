import type { Content, DayDetail, OverviewResponse, TaskDetailResponse } from "../types";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...init
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const client = {
  overview(): Promise<OverviewResponse> {
    return api<OverviewResponse>("/api/overview");
  },
  journey(day?: number): Promise<DayDetail> {
    const url = day ? `/api/journey?day=${encodeURIComponent(day)}` : "/api/journey";
    return api<DayDetail>(url);
  },
  task(taskId: string): Promise<TaskDetailResponse> {
    return api<TaskDetailResponse>(`/api/tasks/${encodeURIComponent(taskId)}`);
  },
  completeTask(taskId: string): Promise<{ ok: boolean }> {
    return api<{ ok: boolean }>(`/api/tasks/${encodeURIComponent(taskId)}/complete`, {
      method: "POST"
    });
  },
  content(contentId: string): Promise<Content> {
    return api<Content>(`/api/content/${encodeURIComponent(contentId)}`);
  },
  scheduleCall(taskId: string, scheduledFor: string): Promise<{ taskId: string }> {
    return api<{ taskId: string }>("/api/calls/schedule", {
      method: "POST",
      body: JSON.stringify({ taskId, scheduledFor })
    });
  },
  submitReflection(week: number, day: number, text: string): Promise<{ ok: boolean }> {
    return api<{ ok: boolean }>("/api/reflections", {
      method: "POST",
      body: JSON.stringify({ week, day, text })
    });
  }
};

