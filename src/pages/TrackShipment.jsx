import { useEffect, useState } from "react";
import { downloadText, toCsv, todayStamp } from "../utils/actions";

const steps = [
  { icon: "warehouse",         label: "Warehouse",    sub: "Berlin, DE",    done: true },
  { icon: "flight_takeoff",    label: "Airport",      sub: "Frankfurt, DE", done: true },
  { icon: "hub",               label: "Rail Hub",      sub: "Milan, IT",     done: true,  active: true },
  { icon: "person_pin_circle", label: "Customer",     sub: "Zurich, CH",    done: false },
];

const history = [
  { date: "22 May 2026", time: "14:22:05", icon: "package_2",      color: "var(--tertiary)", title: "Arrived at Rail Hub", loc: "Milano Smistamento, Milan, IT", tag: "SYSTEM_SCAN" },
  { date: "21 May 2026", time: "09:15:30", icon: "local_shipping", color: "var(--primary)",  title: "Departed Facility", loc: "Logistics Base Delta, Frankfurt, DE", tag: "AUTONOMOUS" },
  { date: "20 May 2026", time: "22:40:11", icon: "inventory_2",    color: "var(--primary)",  title: "Manifest Document Created", loc: "Origin Warehouse (BER-1), Berlin, DE", tag: "OPERATOR_ID: 994" },
];

const defaultTrackingId = "TF-9842-XLY-002";

export default function TrackShipment({ notify, search }) {
  const [trackingId, setTrackingId] = useState(search || defaultTrackingId);
  const [trackedId, setTrackedId] = useState(search || defaultTrackingId);
  const currentStep = steps.findIndex(s => s.active);
  const shortId = trackedId.split("-").slice(0, 2).join("-");

  useEffect(() => {
    if (search?.trim()) {
      const nextId = search.trim().toUpperCase();
      setTrackingId(nextId);
      setTrackedId(nextId);
    }
  }, [search]);

  const track = event => {
    event.preventDefault();
    if (!trackingId.trim()) {
      notify("Enter a tracking ID");
      return;
    }
    setTrackedId(trackingId.trim().toUpperCase());
    notify(`Tracking ${trackingId.trim().toUpperCase()}`);
  };

  const exportLog = () => {
    downloadText(`trackflow-log-${trackedId}-${todayStamp()}.csv`, toCsv(history), "text/csv");
    notify("Telemetry log exported");
  };

  return (
    <div className="slide-in">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>Locate Shipment</h2>
        <p style={{ color: "var(--on-surface-dim)", maxWidth: 480, margin: "0 auto 24px" }}>Enter your tracking ID to get real-time telemetry on your freight.</p>
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <form onSubmit={track} style={{ display: "flex", alignItems: "center", background: "var(--surface-low)", border: "1px solid var(--outline-dim)", borderRadius: 12, padding: "6px 6px 6px 20px", gap: 12 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>target</span>
            <input value={trackingId} onChange={e => setTrackingId(e.target.value.toUpperCase())} style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 18, fontFamily: "var(--mono)", color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }} />
            <button type="submit" style={{ padding: "10px 28px", borderRadius: 8, background: "var(--primary)", color: "var(--on-primary)", fontWeight: 600, border: "none", cursor: "pointer", fontSize: 14 }}>Track</button>
          </form>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, marginBottom: 24 }}>
        <div className="surface-panel" style={{ borderRadius: 12, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 36 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span className="led led-green" />
                <span className="label-sm" style={{ color: "var(--tertiary)" }}>In Transit</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600 }}>Freight #{shortId.replace("TF-", "TF-")}</h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="label-sm" style={{ color: "var(--on-surface-dim)" }}>Last Updated</div>
              <div style={{ fontWeight: 500, marginTop: 2 }}>Today, 14:22 CET</div>
            </div>
          </div>

          <div style={{ position: "relative", padding: "20px 0" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "var(--outline-dim)", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, width: `${(currentStep / (steps.length - 1)) * 100}%`, height: 2, background: "var(--primary)", transform: "translateY(-50%)", boxShadow: "0 0 10px var(--primary)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: s.done ? 1 : 0.35 }}>
                  <div style={{
                    width: s.active ? 52 : 44, height: s.active ? 52 : 44,
                    borderRadius: "50%",
                    background: s.done ? "rgba(173,198,255,0.15)" : "var(--surface-high)",
                    border: `${s.active ? 2 : 1}px solid ${s.done ? "var(--primary)" : "var(--outline-dim)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.done ? "var(--primary)" : "var(--on-surface-dim)",
                    boxShadow: s.active ? "0 0 20px rgba(173,198,255,0.3)" : "none",
                    transition: "all 0.2s",
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{s.icon}</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: s.active ? 600 : 400, color: s.active ? "var(--primary)" : "var(--on-surface)" }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "var(--on-surface-dim)" }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, paddingTop: 24, borderTop: "1px solid var(--outline-dim)", marginTop: 24 }}>
            {[["Carrier", "DHL Europe"], ["Weight", "1,240.50 kg"], ["Type", "Priority Air Freight"]].map(([label, val]) => (
              <div key={label}>
                <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="surface-panel" style={{ borderRadius: 12, padding: 24, position: "relative", overflow: "hidden" }}>
            <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 16 }}>Estimated Arrival</div>
            <div style={{ fontSize: 48, fontWeight: 700, color: "var(--primary)", lineHeight: 1, letterSpacing: "-0.02em" }}>May 24</div>
            <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4, marginBottom: 20 }}>By 18:00 CET</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(173,198,255,0.06)", borderRadius: 8, padding: "10px 14px", border: "1px solid rgba(173,198,255,0.15)" }}>
              <span style={{ fontSize: 13 }}>Precision: 98.4%</span>
              <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: 18 }}>verified</span>
            </div>
          </div>

          <div className="surface-panel" style={{ borderRadius: 12, height: 180, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(31,143,107,0.18), rgba(242,201,109,0.07))" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%", opacity: 0.6 }}>
                <path d="M20,160 Q80,60 160,90 Q240,120 300,40" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6,4" />
                <circle cx="20" cy="160" r="5" fill="var(--tertiary)" />
                <circle cx="300" cy="40" r="5" fill="var(--primary)" />
                <circle cx="170" cy="88" r="8" fill="var(--primary)" opacity="0.8" />
                <circle cx="170" cy="88" r="14" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
            <div style={{ position: "absolute", bottom: 12, left: 14 }}>
              <div className="label-sm" style={{ color: "var(--primary)" }}>Current Sector</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Alpine Corridor</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass" style={{ borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--outline-dim)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Telemetric History</h3>
          <button onClick={exportLog} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>
            Export Log <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
          </button>
        </div>
        {history.map((h, i) => (
          <div key={i} style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 20, borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "background 0.1s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ width: 100, flexShrink: 0 }}>
              <div className="label-sm" style={{ color: "var(--on-surface-dim)" }}>{h.date}</div>
              <div style={{ fontSize: 10, color: "var(--on-surface-dim)", opacity: 0.6, marginTop: 2 }}>{h.time}</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${h.color}18`, border: `1px solid ${h.color}44`, display: "flex", alignItems: "center", justifyContent: "center", color: h.color, flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{h.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{h.title}</div>
              <div style={{ fontSize: 11, color: "var(--on-surface-dim)", marginTop: 2 }}>{h.loc}</div>
            </div>
            <span className="label-sm" style={{ background: "var(--surface-high)", padding: "4px 10px", borderRadius: 4, color: "var(--on-surface-dim)" }}>{h.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
