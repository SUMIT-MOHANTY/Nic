import type { DayChip } from "../types";

export default function WeekStrip({ days, selectedDay }: { days: DayChip[]; selectedDay: number }) {
  return (
    <div className="weekStrip" aria-label="Week progress">
      {days.map((d) => {
        const filled = d.totalTasks > 0 && d.completedTasks >= d.totalTasks;
        const selected = d.day === selectedDay;
        return (
          <span
            key={d.day}
            className={`weekDot ${filled ? "filled" : ""} ${selected ? "selected" : ""}`}
            aria-label={`Day ${d.day}`}
          />
        );
      })}
    </div>
  );
}

