import type { DayChip } from "../types";

export default function DaySelector({
  days,
  selectedDay,
  onSelect
}: {
  days: DayChip[];
  selectedDay: number;
  onSelect: (day: number) => void;
}) {
  return (
    <div className="daySelector" role="tablist" aria-label="Day selector">
      {days.map((d) => {
        const selected = d.day === selectedDay;
        const pct = d.totalTasks > 0 ? Math.round((d.completedTasks / d.totalTasks) * 100) : 0;
        return (
          <button
            key={d.day}
            type="button"
            className={`dayChip ${selected ? "selected" : ""}`}
            onClick={() => onSelect(d.day)}
            role="tab"
            aria-selected={selected}
          >
            <div className="dayChipLabel">DAY</div>
            <div className="dayChipNumber">{d.day}</div>
            <div className="dayChipDot" aria-label={`${pct}% complete`} />
          </button>
        );
      })}
    </div>
  );
}

