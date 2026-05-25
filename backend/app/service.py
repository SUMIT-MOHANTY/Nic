from __future__ import annotations

from collections import defaultdict

from . import storage
from .schemas import (
    Content,
    DayChip,
    DayDetail,
    LearnCard,
    OverviewResponse,
    ProgramSummary,
    Reflection,
    StepSummary,
    Task,
    TaskDetail,
)
from .seed import CONTENT, DAYS_IN_WEEK, LEARN_CARDS, STEP, TASKS, TOTAL_WEEKS


def _completed_set() -> set[str]:
    state = storage.get_state()
    return set(state.get("completedTaskIds", []))


def _user():
    state = storage.get_state()
    return state.get("user", {"id": "demo", "name": "Xyz"})


def _tasks_by_day(week: int) -> dict[int, list]:
    by_day: dict[int, list] = defaultdict(list)
    for t in TASKS:
        if t.week == week:
            by_day[t.day].append(t)
    for day in by_day:
        by_day[day].sort(key=lambda x: x.id)
    return by_day


def current_week_day() -> tuple[int, int]:
    # Matches the screenshots (Week 0, Day 7). Frontend can change day via API.
    return (0, 7)


def list_week_days(week: int) -> list[DayChip]:
    completed = _completed_set()
    by_day = _tasks_by_day(week)
    chips: list[DayChip] = []
    for day in range(1, DAYS_IN_WEEK + 1):
        day_tasks = by_day.get(day, [])
        total = len(day_tasks)
        done = sum(1 for t in day_tasks if t.id in completed)
        chips.append(DayChip(day=day, completedTasks=done, totalTasks=total))
    return chips


def overview() -> OverviewResponse:
    user = _user()
    week, day = current_week_day()
    by_day = _tasks_by_day(week)
    completed = _completed_set()

    today_tasks = by_day.get(day, [])
    today_total = len(today_tasks)
    today_done = sum(1 for t in today_tasks if t.id in completed)
    today_left = max(0, today_total - today_done)

    return OverviewResponse(
        user=user,
        program=ProgramSummary(
            totalWeeks=TOTAL_WEEKS,
            currentWeek=week,
            currentDay=day,
            daysInWeek=DAYS_IN_WEEK,
        ),
        step=StepSummary(**STEP),
        weekDays=list_week_days(week),
        todayTasksLeft=today_left,
        todayCompletedTasks=today_done,
        todayTotalTasks=today_total,
        learnCards=[LearnCard(**c) for c in LEARN_CARDS],
    )


def _reflection_status(week: int, day: int, tasks: list[Task]) -> Reflection:
    completed = _completed_set()
    all_tasks_done = all(t.completed for t in tasks)
    reflection_task_id = f"w{week}d{day}-reflection"
    reflections = storage.get_state().get("reflections", {})
    stored = reflections.get(f"w{week}d{day}")
    locked = not all_tasks_done
    return Reflection(
        id=reflection_task_id,
        week=week,
        day=day,
        locked=locked,
        completed=reflection_task_id in completed or stored is not None,
        text=(stored or {}).get("text"),
        createdAt=(stored or {}).get("createdAt"),
    )


def day_detail(week: int, day: int) -> DayDetail:
    completed = _completed_set()
    by_day = _tasks_by_day(week)
    day_tasks = by_day.get(day, [])

    tasks = [
        Task(
            id=t.id,
            week=t.week,
            day=t.day,
            kind=t.kind,  # type: ignore[arg-type]
            title=t.title,
            description=t.description,
            durationSeconds=t.duration_seconds,
            completed=t.id in completed,
        )
        for t in day_tasks
    ]
    total = len(tasks)
    done = sum(1 for t in tasks if t.completed)
    reflection = _reflection_status(week, day, tasks)
    return DayDetail(
        week=week,
        day=day,
        step=StepSummary(**STEP),
        days=list_week_days(week),
        completedTasks=done,
        totalTasks=total,
        tasks=tasks,
        reflection=reflection,
    )


def task_detail(task_id: str) -> TaskDetail:
    completed = _completed_set()
    task_def = next((t for t in TASKS if t.id == task_id), None)
    if task_def is None:
        raise KeyError(task_id)

    task = Task(
        id=task_def.id,
        week=task_def.week,
        day=task_def.day,
        kind=task_def.kind,  # type: ignore[arg-type]
        title=task_def.title,
        description=task_def.description,
        durationSeconds=task_def.duration_seconds,
        completed=task_def.id in completed,
    )

    content = None
    if task_def.content_id and task_def.content_id in CONTENT:
        c = CONTENT[task_def.content_id]
        content = Content(id=c.id, title=c.title, subtitle=c.subtitle, blocks=c.blocks)

    return TaskDetail(task=task, content=content)


def content_detail(content_id: str) -> Content:
    if content_id not in CONTENT:
        raise KeyError(content_id)
    c = CONTENT[content_id]
    return Content(id=c.id, title=c.title, subtitle=c.subtitle, blocks=c.blocks)

