import { useState } from "react";
import { downloadText, todayStamp } from "../utils/actions";

const methods = [
  { id: "air",    icon: "flight",          label: "Air Express" },
  { id: "sea",    icon: "directions_boat", label: "Ocean Freight" },
  { id: "land",   icon: "local_shipping",  label: "Land Transport" },
  { id: "rail",   icon: "train",           label: "Rail Link" },
];

const customerFields = [
  ["FULL NAME", "e.g. Alisa Biliavska", "text", "fullName"],
  ["EMAIL ADDRESS", "ops@eurofreight.eu", "email", "email"],
  ["PHONE NUMBER", "+370 30 234 5678", "tel", "phone"],
];

const routeFields = [
  {
    icon: "radio_button_checked",
    color: "var(--tertiary)",
    label: "ORIGIN HUB",
    ph1: "Klaipeda Port (KP)",
    ph2: "Burchardkai Terminal 2",
    firstKey: "originHub",
    secondKey: "originGate",
  },
  {
    icon: "location_on",
    color: "var(--secondary)",
    label: "DESTINATION",
    ph1: "Rotterdam Gateway (RTM)",
    ph2: "Maasvlakte Hub 12",
    firstKey: "destinationHub",
    secondKey: "destinationGate",
  },
];

function FormInput({ placeholder, type = "text", value, onChange }) {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{
      width: "100%", background: "rgba(0,0,0,0.4)", border: "none",
      borderBottom: "1px solid var(--outline-dim)", padding: "8px 0",
      color: "var(--on-surface)", fontSize: 14, outline: "none",
      transition: "border-color 0.2s",
    }}
    onFocus={e => e.target.style.borderBottomColor = "var(--primary)"}
    onBlur={e => e.target.style.borderBottomColor = "var(--outline-dim)"}
    />
  );
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  description: "",
  weight: "",
  cargoType: "Standard Freight",
  insurance: "Standard Coverage",
  length: "",
  width: "",
  height: "",
  originHub: "",
  originGate: "",
  destinationHub: "",
  destinationGate: "",
};

export default function CreateOrder({ setPage, notify }) {
  const [trackingId] = useState(() => `TF-${Math.floor(Math.random()*9000+1000)}-${Math.random().toString(36).slice(2,5).toUpperCase()}-${Math.floor(Math.random()*90+10)}`);
  const [method, setMethod] = useState("air");
  const [form, setForm] = useState(initialForm);
  const update = key => event => setForm(prev => ({ ...prev, [key]: event.target.value }));
  const payload = () => ({ trackingId, method, ...form, createdAt: new Date().toISOString() });

  const saveDraft = () => {
    localStorage.setItem("trackflow-draft", JSON.stringify(payload()));
    notify(`Draft saved for ${trackingId}`);
  };

  const createOrder = () => {
    const required = [form.fullName, form.email, form.description, form.originHub, form.destinationHub];
    if (required.some(value => !value.trim())) {
      notify("Fill customer, cargo, origin and destination first");
      return;
    }
    const order = payload();
    const orders = JSON.parse(localStorage.getItem("trackflow-orders") || "[]");
    localStorage.setItem("trackflow-orders", JSON.stringify([order, ...orders]));
    downloadText(`trackflow-order-${trackingId}-${todayStamp()}.json`, JSON.stringify(order, null, 2), "application/json");
    notify(`Order ${trackingId} created`);
    setPage("history");
  };

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span className="label-sm" style={{ color: "var(--primary)" }}>Operation: Nova</span>
            <span className="led led-green led-pulse" />
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Generate New Shipment</h2>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={saveDraft} className="glass" style={{ padding: "8px 20px", borderRadius: 8, color: "var(--on-surface-dim)", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Save Draft</button>
          <button onClick={createOrder} style={{ padding: "8px 20px", borderRadius: 8, background: "linear-gradient(135deg, var(--primary-container), var(--secondary-container))", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer", fontSize: 13, boxShadow: "0 0 20px rgba(77,142,255,0.3)" }}>Create Order</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
        <div className="glass" style={{ gridColumn: "1/-1", padding: "20px 24px", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ padding: 12, background: "rgba(173,198,255,0.1)", borderRadius: 10 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: 28 }}>qr_code_2</span>
            </div>
            <div>
              <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 4 }}>Tracking ID</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--mono)", letterSpacing: "0.06em", color: "var(--on-surface)" }}>{trackingId}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="label-sm" style={{ color: "var(--tertiary)", display: "flex", alignItems: "center", gap: 6 }}>
              <span className="led led-green" />Auto-generated
            </span>
            <div style={{ fontSize: 11, color: "var(--on-surface-dim)", marginTop: 4 }}>Generated at {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} local EU time</div>
          </div>
        </div>

        <div className="glass" style={{ gridColumn: "1/6", padding: 32, borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--secondary)" }}>person</span>
            <h4 style={{ fontSize: 17, fontWeight: 600 }}>Customer Profile</h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {customerFields.map(([label, ph, type, key]) => (
              <div key={label}>
                <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 6 }}>{label}</div>
                <FormInput placeholder={ph} type={type} value={form[key]} onChange={update(key)} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ gridColumn: "6/-1", padding: 32, borderRadius: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, padding: 24, opacity: 0.06, pointerEvents: "none" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 120 }}>package_2</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--tertiary)" }}>inventory_2</span>
            <h4 style={{ fontSize: 17, fontWeight: 600 }}>Freight Specifications</h4>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 6 }}>CARGO DESCRIPTION</div>
              <textarea placeholder="Describe the contents..." rows={2} value={form.description} onChange={update("description")} style={{ width: "100%", background: "rgba(0,0,0,0.4)", border: "none", borderBottom: "1px solid var(--outline-dim)", padding: "8px 0", color: "var(--on-surface)", fontSize: 14, outline: "none", resize: "none" }} />
            </div>
            {[["GROSS WEIGHT (KG)", "0.00", "number"], ["CARGO TYPE", null], ["DIMENSIONS (CM)", null], ["INSURANCE GRADE", null]].map(([label, ph, type]) => (
              <div key={label}>
                <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 6 }}>{label}</div>
                {label === "CARGO TYPE" || label === "INSURANCE GRADE" ? (
                  <select value={label === "CARGO TYPE" ? form.cargoType : form.insurance} onChange={update(label === "CARGO TYPE" ? "cargoType" : "insurance")} style={{ width: "100%", background: "rgba(0,0,0,0.4)", border: "none", borderBottom: "1px solid var(--outline-dim)", padding: "8px 0", color: "var(--on-surface)", fontSize: 14, outline: "none" }}>
                    {label === "CARGO TYPE" ? ["Standard Freight", "Fragile / High-Value", "Perishable Goods", "Hazardous (HazMat)"].map(o => <option key={o}>{o}</option>) : ["Standard Coverage", "Premium Protection", "Decline Insurance"].map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : label === "DIMENSIONS (CM)" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {[["L", "length"], ["W", "width"], ["H", "height"]].map(([d, key], i) => (
                      <span key={d} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                        {i > 0 && <span style={{ color: "var(--on-surface-dim)" }}>x</span>}
                        <input placeholder={d} value={form[key]} onChange={update(key)} style={{ width: "100%", background: "rgba(0,0,0,0.4)", border: "none", borderBottom: "1px solid var(--outline-dim)", padding: "8px 0", color: "var(--on-surface)", fontSize: 14, outline: "none", textAlign: "center" }} />
                      </span>
                    ))}
                  </div>
                ) : (
                  <FormInput placeholder={ph} type={type} value={form.weight} onChange={update("weight")} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ gridColumn: "1/-1", padding: 32, borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>route</span>
            <h4 style={{ fontSize: 17, fontWeight: 600 }}>Logistics Route</h4>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 280px", gap: 48, alignItems: "start" }}>
            {routeFields.map(loc => (
              <div key={loc.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: loc.color }}>{loc.icon}</span>
                  <span className="label-sm" style={{ color: "var(--on-surface-dim)" }}>{loc.label}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder={loc.ph1} value={form[loc.firstKey]} onChange={update(loc.firstKey)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--outline-dim)", borderRadius: 8, padding: "10px 14px", color: "var(--on-surface)", fontSize: 13, outline: "none" }} />
                  <input placeholder={loc.ph2} value={form[loc.secondKey]} onChange={update(loc.secondKey)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--outline-dim)", borderRadius: 8, padding: "10px 14px", color: "var(--on-surface-dim)", fontSize: 12, outline: "none" }} />
                </div>
              </div>
            ))}

            <div>
              <div className="label-sm" style={{ color: "var(--on-surface-dim)", marginBottom: 12 }}>TRANSIT METHOD</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {methods.map(m => (
                  <div key={m.id} onClick={() => setMethod(m.id)} style={{
                    padding: "14px 10px",
                    borderRadius: 8,
                    border: `1px solid ${method === m.id ? "var(--primary)" : "var(--outline-dim)"}`,
                    background: method === m.id ? "rgba(173,198,255,0.06)" : "rgba(255,255,255,0.02)",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    transition: "all 0.15s",
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: method === m.id ? "var(--primary)" : "var(--on-surface-dim)" }}>{m.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: method === m.id ? "var(--primary)" : "var(--on-surface-dim)" }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
