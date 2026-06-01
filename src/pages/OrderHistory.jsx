import { useMemo, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { downloadText, toCsv, todayStamp } from "../utils/actions";

const rows = [
  { id: "#TF-9821-X", date: "24 May 2026", customer: "EuroGrid Systems",    initials: "EG", color: "var(--secondary)", dest: "Berlin, DE",    status: "DELIVERED",  amount: "€4,050.00" },
  { id: "#TF-9822-A", date: "23 May 2026", customer: "Nordline Solutions",  initials: "NS", color: "var(--primary)",   dest: "Copenhagen, DK", status: "IN TRANSIT", amount: "€11,980.00" },
  { id: "#TF-9823-B", date: "23 May 2026", customer: "Blue Danube Freight", initials: "BD", color: "var(--secondary)", dest: "London, UK",     status: "PENDING",    amount: "€1,970.00" },
  { id: "#TF-9824-Q", date: "22 May 2026", customer: "Alpine Supply",       initials: "AS", color: "var(--error)",     dest: "Zurich, CH",     status: "DELAYED",    amount: "€8,740.00" },
  { id: "#TF-9825-L", date: "21 May 2026", customer: "Viking Logistics",    initials: "VL", color: "var(--tertiary)",  dest: "Oslo, NO",       status: "DELIVERED",  amount: "€1,040.00" },
];

const summaryCards = [
  { label: "TOTAL ORDERS", val: "1,284", sub: "+12.4% vs last month", color: "var(--primary)", icon: "package" },
  { label: "IN TRANSIT", val: "42", sub: "3 arriving today", color: "var(--secondary)", icon: "local_shipping" },
  { label: "DELIVERED", val: "1,198", sub: "99.2% success rate", color: "var(--tertiary)", icon: "verified" },
  { label: "REVENUE", val: "€1.3M", sub: "YTD Earnings", color: "var(--primary)", icon: "payments" },
];

const pageSize = 3;

export default function OrderHistory({ setPage, notify, search, setSearch }) {
  const [status, setStatus] = useState("All Statuses");
  const [range, setRange] = useState("Last 30 Days");
  const [page, setPageNumber] = useState(1);
  const [activeRow, setActiveRow] = useState(null);
  const query = search.trim().toLowerCase();

  const filteredRows = useMemo(() => rows.filter(row => {
    const matchesStatus = status === "All Statuses" || row.status === status;
    const haystack = `${row.id} ${row.date} ${row.customer} ${row.dest} ${row.status}`.toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  }), [status, query]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstResult = filteredRows.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastResult = Math.min(currentPage * pageSize, filteredRows.length);

  const exportRows = () => {
    downloadText(`trackflow-orders-${todayStamp()}.csv`, toCsv(filteredRows), "text/csv");
    notify("Orders CSV exported");
  };

  const resetFilters = () => {
    setStatus("All Statuses");
    setRange("Last 30 Days");
    setSearch("");
    setPageNumber(1);
    notify("Filters reset");
  };

  const openRow = row => {
    setSearch(row.id.replace("#", ""));
    setPage("track");
    notify(`Opening ${row.id}`);
  };

  return (
    <div className="slide-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Order History</h2>
          <p style={{ color: "var(--on-surface-dim)", marginTop: 4 }}>Manage and review all historical freight transactions.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={resetFilters} className="glass" style={{ padding: "8px 14px", borderRadius: 8, color: "var(--on-surface-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>
            Filters
          </button>
          <button onClick={exportRows} className="glass" style={{ padding: "8px 14px", borderRadius: 8, color: "var(--on-surface-dim)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>file_download</span>
            Export CSV
          </button>
          <button onClick={() => setPage("create")} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--primary)", color: "var(--on-primary)", fontWeight: 600, border: "none", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>New Shipment
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 24 }}>
        {summaryCards.map(c => (
          <div key={c.label} className="surface-panel" style={{ padding: 20, borderRadius: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span className="label-sm" style={{ color: "var(--on-surface-dim)" }}>{c.label}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: c.color }}>{c.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>{c.val}</div>
            <div style={{ fontSize: 11, color: "var(--tertiary)", fontWeight: 500 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="surface-panel" style={{ borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--outline-dim)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <select value={status} onChange={e => { setStatus(e.target.value); setPageNumber(1); }} style={{ background: "var(--surface-low)", border: "1px solid var(--outline-dim)", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "var(--on-surface)", outline: "none" }}>
              {["All Statuses", "DELIVERED", "IN TRANSIT", "PENDING", "DELAYED"].map(option => <option key={option}>{option}</option>)}
            </select>
            <select value={range} onChange={e => { setRange(e.target.value); notify(`Range: ${e.target.value}`); }} style={{ background: "var(--surface-low)", border: "1px solid var(--outline-dim)", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "var(--on-surface)", outline: "none" }}>
              {["Last 30 Days", "Last 7 Days", "This Month", "All Time"].map(option => <option key={option}>{option}</option>)}
            </select>
          </div>
          <span style={{ fontSize: 11, color: "var(--on-surface-dim)" }}>Showing {firstResult}-{lastResult} of {filteredRows.length} results</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.025)" }}>
              {["Order ID", "Date", "Customer", "Destination", "Status", "Total", ""].map(h => (
                <th key={h} className="label-sm" style={{ padding: "14px 24px", textAlign: "left", color: "var(--on-surface-dim)", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((r, i) => (
              <tr key={r.id} onClick={() => openRow(r)} style={{ borderTop: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "16px 24px" }}><span className="label-sm" style={{ color: "var(--primary)" }}>{r.id}</span></td>
                <td style={{ padding: "16px 24px", fontSize: 12, color: "var(--on-surface-dim)" }}>{r.date}</td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${r.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: r.color }}>{r.initials}</div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{r.customer}</span>
                  </div>
                </td>
                <td style={{ padding: "16px 24px", fontSize: 13 }}>{r.dest}</td>
                <td style={{ padding: "16px 24px" }}><StatusBadge status={r.status} /></td>
                <td style={{ padding: "16px 24px", fontSize: 13, fontWeight: 500 }}>{r.amount}</td>
                <td style={{ padding: "16px 24px", textAlign: "right", position: "relative" }}>
                  <button onClick={e => { e.stopPropagation(); setActiveRow(activeRow === r.id ? null : r.id); }} style={{ background: "none", border: "none", color: "var(--on-surface-dim)", cursor: "pointer" }} className="row-action">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                  {activeRow === r.id && (
                    <div className="surface-panel" style={{ position: "absolute", right: 18, top: 44, zIndex: 5, width: 150, borderRadius: 8, padding: 6 }}>
                      {["View", "Duplicate", "Invoice"].map(action => (
                        <button key={action} onClick={e => { e.stopPropagation(); notify(`${action}: ${r.id}`); setActiveRow(null); }} style={{ width: "100%", background: "transparent", border: "none", color: "var(--on-surface)", textAlign: "left", padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {!visibleRows.length && (
              <tr>
                <td colSpan="7" style={{ padding: "28px 24px", textAlign: "center", color: "var(--on-surface-dim)", fontSize: 13 }}>No orders match the current filters.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ padding: "14px 24px", borderTop: "1px solid var(--outline-dim)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setPageNumber(Math.max(1, currentPage - 1))} className="glass" style={{ padding: "6px 16px", borderRadius: 8, fontSize: 12, color: "var(--on-surface-dim)", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.4 : 1 }} disabled={currentPage === 1}>Previous</button>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(p => (
              <button key={p} onClick={() => setPageNumber(p)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: p === currentPage ? "var(--primary)" : "transparent", color: p === currentPage ? "var(--on-primary)" : "var(--on-surface-dim)", cursor: "pointer", fontSize: 13, fontWeight: p === currentPage ? 600 : 400 }}>{p}</button>
            ))}
          </div>
          <button onClick={() => setPageNumber(Math.min(totalPages, currentPage + 1))} className="glass" style={{ padding: "6px 16px", borderRadius: 8, fontSize: 12, color: "var(--on-surface-dim)", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}
