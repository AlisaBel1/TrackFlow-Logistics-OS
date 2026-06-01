import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import TrackShipment from "./pages/TrackShipment";
import OrderHistory from "./pages/OrderHistory";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import "./styles/global.css";

const pages = {
  landing: LandingPage,
  dashboard: Dashboard,
  create: CreateOrder,
  track: TrackShipment,
  history: OrderHistory,
  analytics: Analytics,
  settings: Settings,
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [showLanding, setShowLanding] = useState(true);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const enterApp = nextPage => {
    setPage(nextPage || "dashboard");
    setShowLanding(false);
  };

  const PageComp = pages[page] || Dashboard;

  const notify = message => {
    setToast(message);
    window.clearTimeout(window.trackflowToastTimer);
    window.trackflowToastTimer = window.setTimeout(() => setToast(""), 2600);
  };

  const goToPage = nextPage => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showLanding) {
    return <LandingPage enterApp={enterApp} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar page={page} setPage={goToPage} />

      <div style={{ flex: 1, marginLeft: 240 }}>
        <TopBar
          search={search}
          setSearch={setSearch}
          setPage={goToPage}
          notify={notify}
        />

        <main style={{ padding: "88px 48px 48px" }}>
          <PageComp
            setPage={goToPage}
            notify={notify}
            search={search}
            setSearch={setSearch}
          />
        </main>
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            right: 28,
            bottom: 28,
            zIndex: 100,
            padding: "12px 16px",
            borderRadius: 8,
            background: "var(--surface-high)",
            border: "1px solid var(--outline-dim)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
            color: "var(--on-surface)",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
