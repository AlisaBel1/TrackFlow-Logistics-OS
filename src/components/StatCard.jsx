export default function StatCard({ label, value, change, changeUp, color, bars }) {
  return (
    <div className="glass" style={{ padding: 24, borderRadius: 12, transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ padding: "6px", background: `${color}18`, borderRadius: 8, color }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, display: "block" }}>package_2</span>
        </div>
        {change && (
          <span className="label-sm" style={{ color: changeUp ? "var(--tertiary)" : "var(--error)", display: "flex", alignItems: "center", gap: 2 }}>
            {change}
          </span>
        )}
      </div>
      <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ marginTop: 16, display: "flex", alignItems: "flex-end", gap: 2, height: 32 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: `${color}${i >= bars.length - 2 ? "ff" : "33"}`, borderRadius: "2px 2px 0 0" }} />
        ))}
      </div>
    </div>
  );
}
