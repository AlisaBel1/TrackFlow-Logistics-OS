import { useMemo, useState } from "react";
import { downloadText, toCsv, todayStamp } from "../utils/actions";

const chartPoints = "0,200 100,180 200,160 300,120 400,100 500,80 600,60 700,40 800,20";
const ranges = ["May 01 - May 14, 2026", "Last 7 Days", "Last 30 Days", "Quarter to Date"];
const metrics = [
  { label: "AVG. DELIVERY TIME", val: "1.4", unit: "days", change: "+12.5%", up: true,  bar: 78, color: "var(--primary)" },
  { label: "SHIPMENT VOLUME",    val: "12,842",unit: "",   change: "+8.2%",  up: true,  bar: null, color: "var(--secondary)" },
  { label: "ON-TIME RATE",       val: "98.2%", unit: "",   change: "-0.4%",  up: false, bar: null, color: "var(--tertiary)" },
  { label: "COST EFFICIENCY",    val: "€3.86", unit: "/kg",change: "+1.8%",  up: true,  bar: 92,  color: "var(--tertiary)" },
];
const logs = [
  { type: "error",   icon: "warning",     title: "Carrier Delay: FRA-MXP",    desc: "Storm cells over the Alps delayed 12 high-priority shipments.", time: "2m ago" },
  { type: "info",    icon: "info",        title: "Route Optimized: AMS-CPH",   desc: "Intermodal freight moved from road to overnight rail slots.", time: "14m ago" },
  { type: "success", icon: "check_circle", title: "Inventory Rebalance",       desc: "Rotterdam and Hamburg buffers are back within target levels.", time: "1h ago" },
];

export default function Analytics({ notify }) {
  const [range, setRange] = useState(ranges[0]);
  const [chartMode, setChartMode] = useState("GLOBAL AVG");
  const reportRows = useMemo(() => metrics.map(metric => ({
    range,
    metric: metric.label,
    value: `${metric.val}${metric.unit}`,
    change: metric.change,
  })), [range]);
  const exportData = () => {
    downloadText(`trackflow-analytics-${todayStamp()}.csv`, toCsv(reportRows), "text/csv");
    notify("Analytics data exported");
  };

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 6 }}>Performance Analytics</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="led led-green led-pulse" />
            <span className="label-sm" style={{ color: "var(--on-surface-dim)" }}>Real-time Stream Active</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <select value={range} onChange={e => { setRange(e.target.value); notify(`Analytics range: ${e.target.value}`); }} className="glass" style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, color: "var(--on-surface)", cursor: "pointer", background: "var(--surface-low)", outline: "none" }}>
            {ranges.map(option => <option key={option}>{option}</option>)}
          </select>
          <button onClick={() => notify(`Current range: ${range}`)} className="glass" style={{ padding: "8px 14px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--on-surface)", cursor: "pointer" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--primary)" }}>calendar_today</span>
            {range}
          </button>
          <button onClick={exportData} style={{ padding: "8px 18px", borderRadius: 8, background: "var(--primary)", color: "var(--on-primary)", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, boxShadow: "0 0 20px rgba(173,198,255,0.2)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>Export Data
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 24 }}>
        {metrics.map(m => (
          <div key={m.label} className="glass" style={{ padding: 24, borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span className="label-sm" style={{ color: "var(--on-surface-dim)" }}>{m.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: m.up ? "var(--tertiary)" : "var(--error)" }}>{m.change}</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>
              {m.val}<span style={{ fontSize: 16, fontWeight: 400, color: "var(--on-surface-dim)" }}>{m.unit}</span>
            </div>
            {m.bar && (
              <div style={{ marginTop: 16, height: 3, background: "var(--surface-high)", borderRadius: 4 }}>
                <div style={{ width: `${m.bar}%`, height: "100%", background: m.color, borderRadius: 4 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="surface-panel" style={{ borderRadius: 12, padding: 28, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 2 }}>Delivery Time Trends</h3>
              <p style={{ fontSize: 12, color: "var(--on-surface-dim)" }}>Daily variance in average fulfillment speed</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["GLOBAL AVG", "REGIONAL"].map(mode => (
                <button key={mode} onClick={() => { setChartMode(mode); notify(`Chart mode: ${mode}`); }} className={mode === chartMode ? "" : "glass"} style={{ padding: "4px 12px", background: mode === chartMode ? "rgba(173,198,255,0.1)" : "transparent", color: mode === chartMode ? "var(--primary)" : "var(--on-surface-dim)", border: mode === chartMode ? "1px solid rgba(173,198,255,0.2)" : "none", borderRadius: 4, fontSize: 10, fontFamily: "var(--mono)", fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer" }}>{mode}</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, position: "relative", minHeight: 200 }}>
            <svg viewBox="0 0 800 220" style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(173,198,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(173,198,255,0)" />
                </linearGradient>
              </defs>
              <path d={`M${chartPoints} L800,220 L0,220 Z`} fill="url(#grad)" />
              <polyline points={chartPoints} fill="none" stroke="var(--primary)" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 6px var(--primary))" }} />
              {chartPoints.split(" ").map((pt, i) => {
                const [x, y] = pt.split(",");
                return <circle key={i} cx={x} cy={y} r="4" fill="var(--primary)" />;
              })}
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingLeft: 8 }}>
            {["May 01", "May 04", "May 07", "May 10", "May 13"].map(d => (
              <span key={d} className="label-sm" style={{ color: "var(--on-surface-dim)", opacity: 0.5 }}>{d}</span>
            ))}
          </div>
        </div>

        <div className="glass" style={{ borderRadius: 12, padding: 28, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Carrier Mix</h3>
          <p style={{ fontSize: 12, color: "var(--on-surface-dim)", marginBottom: 20 }}>Volume split by fulfillment partner</p>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg viewBox="0 0 100 100" style={{ width: 160, height: 160, transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="60" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--tertiary)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="190" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--secondary)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="230" />
            </svg>
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>12.8k</div>
              <div className="label-sm" style={{ color: "var(--on-surface-dim)" }}>Total</div>
            </div>
          </div>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {[["var(--primary)", "DHL Europe", "45%"], ["var(--tertiary)", "DB Schenker", "32%"], ["var(--secondary)", "PostNL Cargo", "23%"]].map(([c, name, pct]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                  <span style={{ fontSize: 13 }}>{name}</span>
                </div>
                <span className="label-sm">{pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-panel" style={{ borderRadius: 12, padding: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Recent Anomaly Logs</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {logs.map((log, i) => {
            const color = log.type === "error" ? "var(--error)" : log.type === "info" ? "var(--primary)" : "var(--tertiary)";
            return (
              <button key={i} onClick={() => notify(`${log.title}: ${log.desc}`)} style={{ display: "flex", gap: 16, padding: "16px 20px", borderRadius: 8, background: `${color}08`, border: `1px solid ${color}22`, color: "var(--on-surface)", textAlign: "left", cursor: "pointer" }}>
                <span className="material-symbols-outlined" style={{ color, marginTop: 1 }}>{log.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{log.title}</span>
                    <span className="label-sm" style={{ color: "var(--on-surface-dim)" }}>{log.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--on-surface-dim)", marginTop: 4 }}>{log.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
