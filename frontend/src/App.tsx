import { Navigate, Route, Routes } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import TaskDetail from "./pages/TaskDetail";
import ContentDetail from "./pages/ContentDetail";
import Reflection from "./pages/Reflection";

export default function App() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/task/:taskId" element={<TaskDetail />} />
        <Route path="/content/:contentId" element={<ContentDetail />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

