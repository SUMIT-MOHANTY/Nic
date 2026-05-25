import Brand from "./icons/Brand";
import BellIcon from "./icons/BellIcon";
import WhatsappIcon from "./icons/WhatsappIcon";
import { getSelectedLanguage, setSelectedLanguage } from "../utils/translate";

export default function TopBar() {
  const currentLang = getSelectedLanguage();

  return (
    <header className="topBar">
      <div className="brand">
        <div className="brandName">Nicotex</div>
        <div className="brandSub">Begin Journey</div>
      </div>
      <div className="topBarRight" style={{ display: 'flex', alignItems: 'center' }}>
        <select
          value={currentLang}
          onChange={(e) => {
            setSelectedLanguage(e.target.value as any);
            window.location.reload();
          }}
          style={{
            background: 'rgba(13, 148, 136, 0.1)',
            color: 'var(--brand)',
            border: 'none',
            borderRadius: '10px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 800,
            marginRight: '8px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="en">EN</option>
          <option value="od">ଓଡ଼ି</option>
          <option value="hi">हिन्</option>
        </select>
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
