import HomeIcon from "./icons/HomeIcon";
import JourneyIcon from "./icons/JourneyIcon";
import ShopIcon from "./icons/ShopIcon";
import ProfileIcon from "./icons/ProfileIcon";

type Tab = "home" | "journey" | "shop" | "profile";

export default function BottomNav({
  active,
  onChange
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <nav className="bottomNav" aria-label="Bottom navigation">
      <button
        type="button"
        className={`navItem ${active === "home" ? "active" : ""}`}
        onClick={() => onChange("home")}
      >
        <HomeIcon />
        <span>Home</span>
      </button>
      <button
        type="button"
        className={`navItem ${active === "journey" ? "active" : ""}`}
        onClick={() => onChange("journey")}
      >
        <JourneyIcon />
        <span>Journey</span>
      </button>
      <button
        type="button"
        className={`navItem ${active === "shop" ? "active" : ""}`}
        onClick={() => onChange("shop")}
      >
        <ShopIcon />
        <span>Shop</span>
      </button>
      <button
        type="button"
        className={`navItem ${active === "profile" ? "active" : ""}`}
        onClick={() => onChange("profile")}
      >
        <ProfileIcon />
        <span>Profile</span>
      </button>
    </nav>
  );
}

