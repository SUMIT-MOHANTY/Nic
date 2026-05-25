from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import service, storage
from .schemas import (
    Content,
    DayDetail,
    OverviewResponse,
    ReflectionRequest,
    ScheduleCallRequest,
    ScheduleCallResponse,
    TaskDetail,
)


app = FastAPI(title="Nicotex Begin API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/overview", response_model=OverviewResponse)
def api_overview():
    return service.overview()


@app.get("/api/journey", response_model=DayDetail)
def api_journey(week: int = 0, day: int | None = None):
    if day is None:
        _, current_day = service.current_week_day()
        day = current_day
    if week < 0 or week > 11:
        raise HTTPException(status_code=400, detail="Invalid week")
    if day < 1 or day > 7:
        raise HTTPException(status_code=400, detail="Invalid day")
    return service.day_detail(week=week, day=day)


@app.get("/api/tasks/{task_id}", response_model=TaskDetail)
def api_task_detail(task_id: str):
    try:
        return service.task_detail(task_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Task not found")


@app.post("/api/tasks/{task_id}/complete")
def api_task_complete(task_id: str):
    try:
        service.task_detail(task_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Task not found")
    storage.mark_task_complete(task_id)
    return {"ok": True}


@app.get("/api/content/{content_id}", response_model=Content)
def api_content_detail(content_id: str):
    try:
        return service.content_detail(content_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Content not found")


@app.post("/api/calls/schedule", response_model=ScheduleCallResponse)
def api_schedule_call(body: ScheduleCallRequest):
    try:
        detail = service.task_detail(body.taskId)
    except KeyError:
        raise HTTPException(status_code=404, detail="Task not found")
    if detail.task.kind != "call":
        raise HTTPException(status_code=400, detail="Task is not a call")
    return storage.schedule_call(task_id=body.taskId, scheduled_for=body.scheduledFor)


@app.post("/api/reflections")
def api_reflections(body: ReflectionRequest):
    payload = service.day_detail(week=body.week, day=body.day)
    if payload.reflection.locked:
        raise HTTPException(status_code=400, detail="Reflection is locked")
    record = storage.upsert_reflection(week=body.week, day=body.day, text=body.text)
    storage.mark_task_complete(payload.reflection.id)
    return {"ok": True, "reflection": record}

