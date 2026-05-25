from __future__ import annotations

import json
import threading
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


_lock = threading.RLock()
_state: dict[str, Any] | None = None


def _state_path() -> Path:
    base_dir = Path(__file__).resolve().parents[1]  # backend/
    data_dir = base_dir / ".data"
    data_dir.mkdir(parents=True, exist_ok=True)
    return data_dir / "state.json"


def _default_state() -> dict[str, Any]:
    return {
        "completedTaskIds": [],
        "reflections": {},  # key: "w{week}d{day}" -> {text, createdAt}
        "scheduledCalls": [],  # [{taskId, scheduledFor, createdAt}]
        "user": {"id": "demo", "name": "Xyz"},
    }


def load_state() -> dict[str, Any]:
    path = _state_path()
    if not path.exists():
        state = _default_state()
        path.write_text(json.dumps(state, indent=2), encoding="utf-8")
        return state
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        state = _default_state()
        path.write_text(json.dumps(state, indent=2), encoding="utf-8")
        return state


def save_state(state: dict[str, Any]) -> None:
    path = _state_path()
    path.write_text(json.dumps(state, indent=2), encoding="utf-8")


def get_state() -> dict[str, Any]:
    global _state
    with _lock:
        if _state is None:
            _state = load_state()
        return _state


def mark_task_complete(task_id: str) -> None:
    with _lock:
        state = get_state()
        completed: list[str] = state.setdefault("completedTaskIds", [])
        if task_id not in completed:
            completed.append(task_id)
            save_state(state)


def upsert_reflection(week: int, day: int, text: str) -> dict[str, Any]:
    key = f"w{week}d{day}"
    now = datetime.now(timezone.utc).isoformat()
    with _lock:
        state = get_state()
        reflections: dict[str, Any] = state.setdefault("reflections", {})
        reflections[key] = {"text": text, "createdAt": now}
        save_state(state)
        return reflections[key]


def schedule_call(task_id: str, scheduled_for: str) -> dict[str, Any]:
    now = datetime.now(timezone.utc).isoformat()
    record = {"taskId": task_id, "scheduledFor": scheduled_for, "createdAt": now}
    with _lock:
        state = get_state()
        calls: list[dict[str, Any]] = state.setdefault("scheduledCalls", [])
        calls.append(record)
        completed: list[str] = state.setdefault("completedTaskIds", [])
        if task_id not in completed:
            completed.append(task_id)
        save_state(state)
    return record
