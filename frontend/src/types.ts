export type TaskKind = "video" | "article" | "call";

export type User = {
  id: string;
  name: string;
};

export type ProgramSummary = {
  totalWeeks: number;
  currentWeek: number;
  currentDay: number;
  daysInWeek: number;
};

export type StepSummary = {
  id: string;
  name: string;
  subtitle: string;
};

export type DayChip = {
  day: number;
  completedTasks: number;
  totalTasks: number;
};

export type Task = {
  id: string;
  week: number;
  day: number;
  kind: TaskKind;
  title: string;
  description: string;
  durationSeconds: number;
  completed: boolean;
};

export type LearnCard = {
  id: string;
  title: string;
  subtitle: string;
  contentId: string;
};

export type OverviewResponse = {
  user: User;
  program: ProgramSummary;
  step: StepSummary;
  weekDays: DayChip[];
  todayTasksLeft: number;
  todayCompletedTasks: number;
  todayTotalTasks: number;
  learnCards: LearnCard[];
};

export type Reflection = {
  id: string;
  week: number;
  day: number;
  locked: boolean;
  completed: boolean;
  text?: string | null;
  createdAt?: string | null;
};

export type DayDetail = {
  week: number;
  day: number;
  step: StepSummary;
  days: DayChip[];
  completedTasks: number;
  totalTasks: number;
  tasks: Task[];
  reflection: Reflection;
};

export type Content = {
  id: string;
  title: string;
  subtitle?: string | null;
  blocks: Array<Record<string, unknown>>;
};

export type TaskDetailResponse = {
  task: Task;
  content?: Content | null;
};

