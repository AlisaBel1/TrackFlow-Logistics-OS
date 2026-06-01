export default function StatusBadge({ status }) {
  const map = {
    "IN TRANSIT":        { led: "led-green", color: "var(--tertiary)",   bg: "rgba(78,222,163,0.08)",  border: "rgba(78,222,163,0.2)" },
    "CONFIRMED":         { led: "led-blue",  color: "var(--primary)",    bg: "rgba(173,198,255,0.08)", border: "rgba(173,198,255,0.2)" },
    "SHIPPED":           { led: "led-blue",  color: "var(--secondary)",  bg: "rgba(208,188,255,0.08)", border: "rgba(208,188,255,0.2)" },
    "DELIVERED":         { led: "led-green", color: "var(--tertiary)",   bg: "rgba(78,222,163,0.08)",  border: "rgba(78,222,163,0.2)" },
    "PENDING":           { led: "led-amber", color: "#fde047",           bg: "rgba(253,224,71,0.08)",  border: "rgba(253,224,71,0.2)" },
    "DELAYED":           { led: "led-red",   color: "var(--error)",      bg: "rgba(255,180,171,0.08)", border: "rgba(255,180,171,0.2)" },
    "CANCELLED":         { led: "led-red",   color: "var(--error)",      bg: "rgba(255,180,171,0.08)", border: "rgba(255,180,171,0.2)" },
    "CREATED":           { led: "led-amber", color: "#888",              bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)" },
    "OUT FOR DELIVERY":  { led: "led-blue",  color: "var(--primary)",    bg: "rgba(173,198,255,0.08)", border: "rgba(173,198,255,0.2)" },
    "LOADING":           { led: "led-blue",  color: "var(--secondary)",  bg: "rgba(208,188,255,0.08)", border: "rgba(208,188,255,0.2)" },
  };
  const c = map[status] || map["PENDING"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 8px", borderRadius: 4,
      background: c.bg, border: `1px solid ${c.border}`,
      color: c.color, fontSize: 10,
      fontFamily: "var(--mono)", letterSpacing: "0.06em",
    }}>
      <span className={`led ${c.led}`} />
      {status}
    </span>
  );
}
