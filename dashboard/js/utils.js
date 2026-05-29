const COLORS = ["#0b63ce", "#22c55e", "#f59e0b", "#7c3aed", "#0891b2", "#ec4899", "#ef4444"];

const euro = value =>
  value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
