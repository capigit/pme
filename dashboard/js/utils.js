const COLORS = ["#0b63ce", "#22c55e", "#f59e0b", "#7c3aed", "#0891b2", "#ec4899", "#ef4444"];
const DEFAULT_REPORT_DATA = cloneReportData(reportData);

const euro = value =>
  value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const percent = value =>
  value.toLocaleString("fr-FR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: value > 0 && value < 1 ? 1 : 0
  }) + " %";

function cloneReportData(data) {
  return JSON.parse(JSON.stringify(data));
}

function colorsFor(count) {
  return Array.from({ length: count }, (_, index) => COLORS[index % COLORS.length]);
}

function sumEntries(entries) {
  return entries.reduce((sum, [, value]) => sum + value, 0);
}

function parseReportDataFile(content) {
  const text = content.trim();

  if (!text) {
    throw new Error("Le fichier est vide.");
  }

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/(?:const|let|var)?\s*reportData\s*=\s*({[\s\S]*})\s*;?\s*$/);

    if (!match) {
      throw new Error("Format non reconnu. Utilisez un JSON ou un data.js contenant reportData.");
    }

    try {
      return JSON.parse(match[1]);
    } catch {
      throw new Error("Le contenu reportData doit garder une structure JSON valide.");
    }
  }
}

function normalizeReportData(data) {
  if (!isPlainObject(data)) {
    throw new Error("Les données doivent être un objet.");
  }

  return {
    chiffre_affaires_total: normalizeAmount(
      data.chiffre_affaires_total,
      "chiffre_affaires_total"
    ),
    par_produit: normalizeBreakdown(data.par_produit, "par_produit"),
    par_ville: normalizeBreakdown(data.par_ville, "par_ville")
  };
}

function normalizeBreakdown(value, fieldName) {
  if (!isPlainObject(value)) {
    throw new Error(`"${fieldName}" doit être un objet.`);
  }

  const normalized = {};

  for (const [rawLabel, rawAmount] of Object.entries(value)) {
    const label = String(rawLabel).trim();

    if (!label) {
      throw new Error(`"${fieldName}" contient un libellé vide.`);
    }

    if (Object.prototype.hasOwnProperty.call(normalized, label)) {
      throw new Error(`"${fieldName}" contient un doublon : ${label}.`);
    }

    normalized[label] = normalizeAmount(rawAmount, `${fieldName}.${label}`);
  }

  if (Object.keys(normalized).length === 0) {
    throw new Error(`"${fieldName}" doit contenir au moins une valeur.`);
  }

  return normalized;
}

function normalizeAmount(value, fieldName) {
  const candidate = typeof value === "string"
    ? value.replace(/\s/g, "").replace(",", ".")
    : value;
  const amount = Number(candidate);

  if (!Number.isFinite(amount)) {
    throw new Error(`Valeur invalide pour "${fieldName}".`);
  }

  if (amount < 0) {
    throw new Error(`"${fieldName}" ne peut pas être négatif.`);
  }

  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
