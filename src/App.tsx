import { Navigate, Route, Routes } from "react-router";
import PrototypeIndexPage from "@/pages/PrototypeIndexPage";
import { routes } from "@/routes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrototypeIndexPage />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
