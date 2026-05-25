import ChatBubbleIcon from "./icons/ChatBubbleIcon";

export default function FloatingChat({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="floatingChat" 
      type="button" 
      onClick={onClick}
      style={{
        borderRadius: '24px',
        padding: '12px 20px'
      }}
    >
      <span className="chatIconWrap" style={{ borderRadius: '14px' }}>
        <ChatBubbleIcon />
      </span>
      <span className="chatText" style={{ marginLeft: '4px' }}>
        Ask your
        <br />
        <strong style={{ color: 'var(--brand)', fontWeight: 800 }}>Counsellor</strong>
      </span>
    </button>
  );
}


