import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "@/contexts/AuthProvider";
import PrototypeIndexPage from "@/pages/PrototypeIndexPage";
import { routes } from "@/routes";

export default function App() {
  return (
    <AuthProvider>
      <Suspense>
        <Routes>
          <Route path="/" element={<PrototypeIndexPage />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
