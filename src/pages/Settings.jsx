import { useState } from "react";
import { downloadText, todayStamp } from "../utils/actions";

const defaults = {
  displayName: "Alisa Biliavska",
  email: "alisa@trackflow.eu",
  role: "EU Ops Director",
  shipmentUpdates: true,
  anomalyAlerts: true,
  weeklyReports: false,
};

export default function Settings({ notify }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("trackflow-settings");
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  });
  const update = key => event => setSettings(prev => ({ ...prev, [key]: event.target.value }));
  const toggle = key => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  const save = () => {
    localStorage.setItem("trackflow-settings", JSON.stringify(settings));
    notify("Settings saved");
  };
  const reset = () => {
    setSettings(defaults);
    localStorage.removeItem("trackflow-settings");
    notify("Settings reset");
  };
  const exportSettings = () => {
    downloadText(`trackflow-settings-${todayStamp()}.json`, JSON.stringify(settings, null, 2), "application/json");
    notify("Settings exported");
  };

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>Settings</h2>
          <p style={{ color: "var(--on-surface-dim)" }}>Manage your workspace configuration and preferences.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={reset} className="glass" style={{ padding: "8px 14px", borderRadius: 8, color: "var(--on-surface-dim)", cursor: "pointer", border: "1px solid var(--outline-dim)" }}>Reset</button>
          <button onClick={exportSettings} className="glass" style={{ padding: "8px 14px", borderRadius: 8, color: "var(--on-surface-dim)", cursor: "pointer", border: "1px solid var(--outline-dim)" }}>Export</button>
          <button onClick={save} style={{ padding: "8px 18px", borderRadius: 8, background: "var(--primary)", color: "var(--on-primary)", fontWeight: 600, border: "none", cursor: "pointer" }}>Save</button>
        </div>
      </div>
      <div style={{ maxWidth: 600 }}>
        <div className="glass" style={{ borderRadius: 12, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--outline-dim)" }}>
            <span className="label-sm" style={{ color: "var(--on-surface-dim)" }}>Account</span>
          </div>
          {[
            ["Display Name", "displayName", "text"],
            ["Email", "email", "email"],
            ["Role", "role", "text"],
          ].map(([label, key, type]) => (
            <label key={key} style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", gap: 20 }}>
              <span style={{ fontSize: 13 }}>{label}</span>
              <input type={type} value={settings[key]} onChange={update(key)} style={{ width: 260, background: "var(--surface-low)", border: "1px solid var(--outline-dim)", borderRadius: 8, padding: "8px 10px", color: "var(--on-surface)", outline: "none", fontSize: 13 }} />
            </label>
          ))}
        </div>

        <div className="glass" style={{ borderRadius: 12, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--outline-dim)" }}>
            <span className="label-sm" style={{ color: "var(--on-surface-dim)" }}>Notifications</span>
          </div>
          {[
            ["Shipment Updates", "shipmentUpdates"],
            ["Anomaly Alerts", "anomalyAlerts"],
            ["Weekly Reports", "weeklyReports"],
          ].map(([label, key]) => (
            <div key={key} style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 13 }}>{label}</span>
              <button onClick={() => toggle(key)} style={{ width: 48, height: 26, borderRadius: 20, border: `1px solid ${settings[key] ? "var(--primary)" : "var(--outline-dim)"}`, background: settings[key] ? "rgba(173,198,255,0.18)" : "var(--surface-low)", padding: 2, cursor: "pointer" }}>
                <span style={{ display: "block", width: 20, height: 20, borderRadius: "50%", background: settings[key] ? "var(--primary)" : "var(--outline)", transform: settings[key] ? "translateX(20px)" : "translateX(0)", transition: "transform 0.15s" }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
