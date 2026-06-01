import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { downloadText, toCsv, todayStamp } from "../utils/actions";

const shipments = [
  { id: "TF-88429-01", type: "Standard Air Freight", dest: "Berlin, DE", hub: "Zentral Hub 4", progress: 65, status: "IN TRANSIT", eta: "14:20 24 May 2026" },
  { id: "TF-23190-88", type: "Priority Sea Cargo",   dest: "Rotterdam, NL", hub: "Maasvlakte Terminal", progress: 20, status: "LOADING", eta: "09:15 26 May 2026" },
  { id: "TF-44102-12", type: "Last-Mile Express",    dest: "Milan, IT", hub: "Lombardia Distribution", progress: 92, status: "OUT FOR DELIVERY", eta: "Within 2 hrs" },
  { id: "TF-11004-92", type: "Overland Haul",        dest: "Vienna, AT", hub: "Danube Logistics Park", progress: 45, status: "DELAYED", eta: "18:00 25 May 2026" },
];

function progressColor(s) {
  if (s === "DELAYED") return "var(--error)";
  if (s === "OUT FOR DELIVERY") return "var(--primary)";
  if (s === "LOADING") return "var(--secondary)";
  return "var(--tertiary)";
}

export default function Dashboard({ setPage, notify }) {
  const exportReport = () => {
    downloadText(`trackflow-dashboard-${todayStamp()}.csv`, toCsv(shipments), "text/csv");
    notify("Dashboard report exported");
  };

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Operations Dashboard</h2>
          <p style={{ color: "var(--on-surface-dim)", marginTop: 4 }}>Real-time logistics monitoring for the Central Europe network.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => notify("Dashboard range: last 24 hours")} className="glass" style={{ padding: "8px 16px", borderRadius: 8, color: "var(--on-surface)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
            Last 24 Hours
          </button>
          <button onClick={exportReport} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--primary)", color: "var(--on-primary)", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, boxShadow: "0 0 20px rgba(173,198,255,0.25)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
            Export Report
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 24 }}>
        <StatCard label="TOTAL ORDERS" value="1,284" change="+12.5%" changeUp color="var(--primary)" bars={[30,50,40,70,60,90,75]} />
        <StatCard label="IN TRANSIT"   value="432"   change="Steady"     changeUp={false} color="var(--secondary)" bars={[60,40,80,95,50,65,45]} />
        <StatCard label="DELIVERED"    value="812"   change="98% Rate"   changeUp color="var(--tertiary)" bars={[40,60,70,50,80,100,90]} />
        <StatCard label="PENDING"      value="36"    change="Critical (4)" changeUp={false} color="var(--error)" bars={[90,70,80,50,40,30,20]} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div className="glass" style={{ borderRadius: 12, padding: 24, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600 }}>Active Shipments</h3>
            <button onClick={() => setPage("history")} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>View All</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--outline-dim)" }}>
                {["Tracking ID", "Destination", "Progress", "Status", "ETA"].map(h => (
                  <th key={h} className="label-sm" style={{ padding: "0 0 14px", textAlign: "left", color: "var(--on-surface-dim)", fontWeight: 500, paddingRight: 16 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "18px 16px 18px 0" }}>
                    <div className="label-sm" style={{ color: "var(--primary)" }}>{s.id}</div>
                    <div style={{ fontSize: 11, color: "var(--on-surface-dim)", marginTop: 2 }}>{s.type}</div>
                  </td>
                  <td style={{ paddingRight: 16 }}>
                    <div style={{ fontSize: 13 }}>{s.dest}</div>
                    <div style={{ fontSize: 11, color: "var(--on-surface-dim)" }}>{s.hub}</div>
                  </td>
                  <td style={{ paddingRight: 16 }}>
                    <div style={{ fontSize: 11, color: "var(--on-surface-dim)", marginBottom: 4 }}>{s.progress}%</div>
                    <div style={{ width: 120, height: 4, background: "var(--surface-mid)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${s.progress}%`, height: "100%", background: progressColor(s.status), borderRadius: 4 }} />
                    </div>
                  </td>
                  <td style={{ paddingRight: 16 }}><StatusBadge status={s.status} /></td>
                  <td style={{ fontSize: 13, color: "var(--on-surface-dim)" }}>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="surface-panel" style={{ borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Fleet Capacity</h3>
            {[
              { label: "Road Network", val: 82, color: "var(--primary)" },
              { label: "Air Cargo",    val: 44, color: "var(--tertiary)" },
              { label: "Rail & Port",  val: 68, color: "var(--secondary)" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span>{f.label}</span>
                  <span style={{ color: f.color, fontWeight: 600 }}>{f.val}%</span>
                </div>
                <div style={{ height: 6, background: "var(--surface-high)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${f.val}%`, height: "100%", background: f.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>

          <div className="surface-panel" style={{ borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Log Activity</h3>
            {[
              { dot: "var(--tertiary)", text: "Shipment #TF-88429 cleared customs at FRA.", time: "12 mins ago" },
              { dot: "var(--error)",    text: "Weather alert: delayed rail slot near Brenner Pass.", time: "45 mins ago" },
              { dot: "var(--primary)",  text: "New dispatch #TF-99021 assigned to Berlin fleet 04.", time: "1 hr ago" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.dot, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, lineHeight: 1.5 }}>{a.text}</div>
                  <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
