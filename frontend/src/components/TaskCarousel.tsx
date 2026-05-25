import type { Task } from "../types";
import TaskCard from "./TaskCard";

export default function TaskCarousel({
  tasks,
  onOpenTask
}: {
  tasks: Task[];
  onOpenTask: (taskId: string) => void;
}) {
  if (tasks.length === 0) {
    return <div className="emptyState">No tasks for this day.</div>;
  }

  return (
    <div className="carousel" aria-label="Today's tasks">
      {tasks.map((t) => (
        <div className="carouselItem" key={t.id}>
          <TaskCard task={t} onOpen={() => onOpenTask(t.id)} />
        </div>
      ))}
    </div>
  );
}

