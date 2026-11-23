import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "@/features/home/HomePage";
import { routes } from "@/routes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
