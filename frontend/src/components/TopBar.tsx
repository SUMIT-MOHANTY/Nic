import Brand from "./icons/Brand";
import BellIcon from "./icons/BellIcon";
import WhatsappIcon from "./icons/WhatsappIcon";

export default function TopBar() {
  return (
    <header className="topBar">
      <div className="brand">
        <div className="brandName">Nicotex</div>
        <div className="brandSub">Begin Journey</div>
      </div>
      <div className="topBarRight">
        <button className="iconButton" type="button" aria-label="WhatsApp" style={{ color: '#25D366' }}>
          <WhatsappIcon />
        </button>
        <button className="iconButton" type="button" aria-label="Notifications" style={{ position: 'relative' }}>
          <BellIcon />
          <span style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            width: '8px', 
            height: '8px', 
            background: 'var(--accent)', 
            borderRadius: '50%',
            border: '2px solid white'
          }} />
        </button>
      </div>
    </header>
  );
}
