import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import FloatingChat from "./FloatingChat";
import TopBar from "./TopBar";

export default function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const active =
    pathname.startsWith("/journey") || pathname.startsWith("/task") || pathname.startsWith("/reflection")
      ? "journey"
      : pathname.startsWith("/shop")
        ? "shop"
        : pathname.startsWith("/profile")
          ? "profile"
          : "home";

  return (
    <div className="appRoot">
      <div className="phoneShell">
        <TopBar />
        <main className="contentArea">
          <Outlet />
        </main>
        <FloatingChat onClick={() => navigate("/journey")} />
        <BottomNav
          active={active}
          onChange={(next) => {
            if (next === "home") navigate("/");
            if (next === "journey") navigate("/journey");
            if (next === "shop") navigate("/shop");
            if (next === "profile") navigate("/profile");
          }}
        />
      </div>
    </div>
  );
}
