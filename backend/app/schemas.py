from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


TaskKind = Literal["video", "article", "call"]


class User(BaseModel):
    id: str
    name: str


class ProgramSummary(BaseModel):
    totalWeeks: int
    currentWeek: int
    currentDay: int
    daysInWeek: int


class DayChip(BaseModel):
    day: int
    completedTasks: int
    totalTasks: int


class StepSummary(BaseModel):
    id: str
    name: str
    subtitle: str


class Task(BaseModel):
    id: str
    week: int
    day: int
    kind: TaskKind
    title: str
    description: str
    durationSeconds: int
    completed: bool


class Reflection(BaseModel):
    id: str
    week: int
    day: int
    locked: bool
    completed: bool
    text: str | None = None
    createdAt: str | None = None


class LearnCard(BaseModel):
    id: str
    title: str
    subtitle: str
    contentId: str


class OverviewResponse(BaseModel):
    user: User
    program: ProgramSummary
    step: StepSummary
    weekDays: list[DayChip]
    todayTasksLeft: int = Field(ge=0)
    todayCompletedTasks: int = Field(ge=0)
    todayTotalTasks: int = Field(ge=0)
    learnCards: list[LearnCard]


class DayDetail(BaseModel):
    week: int
    day: int
    step: StepSummary
    days: list[DayChip]
    completedTasks: int = Field(ge=0)
    totalTasks: int = Field(ge=0)
    tasks: list[Task]
    reflection: Reflection


class Content(BaseModel):
    id: str
    title: str
    subtitle: str | None = None
    blocks: list[dict]


class TaskDetail(BaseModel):
    task: Task
    content: Content | None = None


class ScheduleCallRequest(BaseModel):
    taskId: str
    scheduledFor: str


class ScheduleCallResponse(BaseModel):
    taskId: str
    scheduledFor: str
    createdAt: str


class ReflectionRequest(BaseModel):
    week: int
    day: int
    text: str = Field(min_length=1, max_length=2000)

