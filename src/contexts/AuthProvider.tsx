import { useEffect, useState, type PropsWithChildren } from "react";
import { matchPath, useLocation } from "react-router";
import { logout, restoreSession, subscribeSignedOut } from "@/apis/auth";
import { getCallbackError } from "@/features/auth/callback";
import { AUTH_CALLBACK_PATH } from "@/features/auth/paths";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const [skipInitialRestore] = useState(
    () =>
      Boolean(matchPath(AUTH_CALLBACK_PATH, location.pathname)) &&
      getCallbackError(location) !== null,
  );

  const auth = useAuth(restoreSession, logout, skipInitialRestore);
  const { clearSession } = auth;

  useEffect(() => subscribeSignedOut(clearSession), [clearSession]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
