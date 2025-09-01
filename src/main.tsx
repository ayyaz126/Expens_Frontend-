import ReactDOM from "react-dom/client";
import App from "./App";
import './i18n' 
import "./index.css";
import { StrictMode, useEffect, useState } from "react";
import { useAuthStore } from "./store/auth.store";

function RehydrateZustand({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.resolve(useAuthStore.persist?.rehydrate?.()).then(() => {
      useAuthStore.setState({ rehydrated: true });
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RehydrateZustand>
      <App />
    </RehydrateZustand>
  </StrictMode>
);

