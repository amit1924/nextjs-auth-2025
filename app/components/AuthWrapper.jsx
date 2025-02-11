import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const REFRESH_INTERVAL = 5 * 60 * 1000; // Refresh 5 minutes before expiry

export default function AuthWrapper({ children }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const timeLeft = session.user.exp * 1000 - Date.now();
    const refreshTime = timeLeft - REFRESH_INTERVAL;

    if (refreshTime > 0) {
      const timeout = setTimeout(() => {
        signIn("credentials", { redirect: false }); // Re-authenticate silently
      }, refreshTime);
      return () => clearTimeout(timeout);
    } else {
      signOut(); // Log out if the session is already expired
    }
  }, [session]);

  return <>{children}</>;
}
