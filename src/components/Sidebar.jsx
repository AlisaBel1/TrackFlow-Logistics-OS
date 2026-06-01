const navItems = [
  { id: "dashboard",  icon: "grid_view",     label: "Dashboard" },
  { id: "create",     icon: "add_box",        label: "Create Order" },
  { id: "track",      icon: "location_on",    label: "Track Shipment" },
  { id: "history",    icon: "history",        label: "Order History" },
  { id: "analytics",  icon: "monitoring",     label: "Analytics" },
  { id: "settings",   icon: "settings",       label: "Settings" },
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside style={{
      position: "fixed", left: 0, top: 0, height: "100vh", width: 240,
      background: "rgba(19,19,19,0.94)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid var(--outline-dim)",
      display: "flex", flexDirection: "column",
      padding: "24px 0", zIndex: 50,
    }}>
      <div style={{ padding: "0 24px", marginBottom: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--primary)", letterSpacing: "-0.02em" }}>TrackFlow</div>
        <div className="label-sm" style={{ color: "var(--on-surface-dim)", opacity: 0.6, marginTop: 2 }}>Logistics OS</div>
      </div>

      <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 16px",
              borderRadius: 4,
              cursor: "pointer",
              border: "none",
              textAlign: "left",
              color: active ? "var(--primary)" : "var(--on-surface-dim)",
              background: active ? "rgba(173,198,255,0.08)" : "transparent",
              borderLeft: active ? "2px solid var(--primary)" : "2px solid transparent",
              fontWeight: active ? 600 : 400,
              fontSize: 14,
              transition: "all 0.15s",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20,
                fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "0 12px", marginTop: "auto" }}>
        <div className="glass" style={{ padding: "12px 16px", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(173,198,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontSize: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Alisa Biliavska</div>
            <div style={{ fontSize: 10, color: "var(--on-surface-dim)" }}>EU Ops Director</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
