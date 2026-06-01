import { useState } from "react";

export default function TopBar({ search, setSearch, setPage, notify }) {
  const [openPanel, setOpenPanel] = useState(null);
  const submitSearch = event => {
    event.preventDefault();
    const query = search.trim();
    if (!query) {
      notify("Введите ID, город или клиента для поиска");
      return;
    }
    setPage("history");
    notify(`Поиск запущен: ${query}`);
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 240, right: 0, height: 64,
      background: "rgba(19,19,19,0.94)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--outline-dim)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", zIndex: 40,
    }}>
      <div style={{ flex: 1, maxWidth: 400 }}>
        <form onSubmit={submitSearch} style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--surface-low)",
          border: "1px solid var(--outline-dim)",
          borderRadius: 8, padding: "6px 14px",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--on-surface-dim)" }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders, shipments..." style={{
            background: "none", border: "none", outline: "none",
            fontSize: 13, color: "var(--on-surface)", width: "100%",
          }} />
        </form>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
        <button onClick={() => setOpenPanel(openPanel === "notifications" ? null : "notifications")} title="Notifications" style={{ background: "none", border: "none", color: "var(--on-surface-dim)", cursor: "pointer" }}>
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button onClick={() => setOpenPanel(openPanel === "quick" ? null : "quick")} title="Quick actions" style={{ background: "none", border: "none", color: "var(--on-surface-dim)", cursor: "pointer" }}>
          <span className="material-symbols-outlined">grid_view</span>
        </button>
        {openPanel && (
          <div className="glass" style={{ position: "absolute", top: 42, right: 0, width: 260, borderRadius: 10, padding: 12 }}>
            {openPanel === "notifications" ? (
              [
                ["warning", "Delay alert", "TF-11004-92 needs Brenner slot review"],
                ["check_circle", "Delivered", "TF-44102-12 completed in Milan"],
                ["schedule", "ETA update", "3 EU shipments arriving today"],
              ].map(([icon, title, text]) => (
                <button key={title} onClick={() => notify(`${title}: ${text}`)} style={{ width: "100%", background: "transparent", border: "none", color: "var(--on-surface)", display: "flex", gap: 10, textAlign: "left", padding: "10px 8px", borderRadius: 6, cursor: "pointer" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: 18 }}>{icon}</span>
                  <span><span style={{ display: "block", fontSize: 13, fontWeight: 600 }}>{title}</span><span style={{ fontSize: 11, color: "var(--on-surface-dim)" }}>{text}</span></span>
                </button>
              ))
            ) : (
              [
                ["add_box", "New Shipment", "create"],
                ["location_on", "Track Shipment", "track"],
                ["monitoring", "Analytics", "analytics"],
              ].map(([icon, label, target]) => (
                <button key={label} onClick={() => { setPage(target); setOpenPanel(null); }} style={{ width: "100%", background: "transparent", border: "none", color: "var(--on-surface)", display: "flex", gap: 10, alignItems: "center", textAlign: "left", padding: "10px 8px", borderRadius: 6, cursor: "pointer" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: 18 }}>{icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </header>
  );
}
