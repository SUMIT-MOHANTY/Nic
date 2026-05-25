import type { Task } from "../types";
import { formatDuration } from "../utils/format";
import ArticleIcon from "./icons/ArticleIcon";
import PlayIcon from "./icons/PlayIcon";
import PhoneIcon from "./icons/PhoneIcon";

function KindIcon({ kind }: { kind: Task["kind"] }) {
  if (kind === "video") return <PlayIcon />;
  if (kind === "article") return <ArticleIcon />;
  return <PhoneIcon />;
}

export default function TaskCard({
  task,
  onOpen
}: {
  task: Task;
  onOpen: () => void;
}) {
  return (
    <div 
      className={`taskCard ${task.completed ? "done" : ""}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '240px'
      }}
    >
      <div>
        <div className="taskMeta">
          <span className="taskKindIcon" style={{ background: task.completed ? 'white' : 'var(--bg)' }}>
            <KindIcon kind={task.kind} />
          </span>
          <span className="taskDuration">{formatDuration(task.durationSeconds)}</span>
          {task.completed && <span className="taskDoneTag" style={{ background: '#2dd4bf', color: 'white' }}>Done</span>}
        </div>
        <div className="taskTitle" style={{ fontSize: '20px', marginTop: '16px' }}>{task.title}</div>
        <div className="taskDesc" style={{ fontSize: '13px', marginTop: '8px', opacity: 0.7 }}>{task.description}</div>
      </div>
      
      <button 
        type="button" 
        className="primaryButton" 
        onClick={onOpen}
        style={{
          marginTop: '20px',
          background: task.completed ? 'rgba(0,0,0,0.05)' : 'var(--btn)',
          color: task.completed ? 'var(--text)' : 'white',
          boxShadow: task.completed ? 'none' : 'var(--shadow-md)'
        }}
      >
        {task.completed ? "Review Lesson" : "Start Now"}
      </button>
    </div>
  );
}


