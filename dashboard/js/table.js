const detailState = {
  initialized: false,
  type: "products",
  total: 0,
  rows: {
    products: [],
    cities: []
  }
};

function initDetailTable(data, produits, villes) {
  setupDetailTable();

  detailState.total = data.chiffre_affaires_total;
  detailState.rows.products = buildDetailRows(produits, detailState.total);
  detailState.rows.cities = buildDetailRows(villes, detailState.total);

  renderDetailTable();
}

function setupDetailTable() {
  if (detailState.initialized) {
    return;
  }

  document.querySelectorAll("[data-detail-type]").forEach(button => {
    button.addEventListener("click", () => {
      detailState.type = button.dataset.detailType;
      updateDetailSegments();
      renderDetailTable();
    });
  });

  document.getElementById("detail-search").addEventListener("input", renderDetailTable);
  document.getElementById("detail-sort").addEventListener("change", renderDetailTable);

  updateDetailSegments();
  detailState.initialized = true;
}

function buildDetailRows(entries, total) {
  return entries.map(([name, ca], index) => ({
    rank: index + 1,
    name,
    ca,
    share: total > 0 ? (ca / total) * 100 : 0
  }));
}

function renderDetailTable() {
  const tableBody = document.getElementById("detail-table-body");
  const nameHeading = document.getElementById("detail-name-heading");
  const detailMeta = document.getElementById("detail-meta");
  const searchValue = normalizeSearch(document.getElementById("detail-search").value);
  const sortValue = document.getElementById("detail-sort").value;
  const rows = sortDetailRows(
    filterDetailRows(detailState.rows[detailState.type], searchValue),
    sortValue
  );
  const totalRows = detailState.rows[detailState.type].length;

  tableBody.replaceChildren();
  nameHeading.textContent = detailState.type === "products" ? "Produit" : "Ville";
  detailMeta.textContent = rows.length === totalRows
    ? `${totalRows} lignes disponibles.`
    : `${rows.length} sur ${totalRows} lignes trouvées.`;

  if (rows.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.className = "empty-cell";
    cell.textContent = "Aucune donnée ne correspond à la recherche.";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  rows.forEach(rowData => {
    const row = document.createElement("tr");

    row.append(
      createDetailCell("Rang", `#${rowData.rank}`),
      createDetailCell(detailState.type === "products" ? "Produit" : "Ville", rowData.name),
      createDetailCell("Chiffre d'affaires", euro(rowData.ca), "numeric"),
      createDetailCell("Part du total", percent(rowData.share), "numeric")
    );

    tableBody.appendChild(row);
  });
}

function createDetailCell(label, value, className = "") {
  const cell = document.createElement("td");

  cell.dataset.label = label;
  cell.textContent = value;

  if (className) {
    cell.classList.add(className);
  }

  return cell;
}

function filterDetailRows(rows, searchValue) {
  if (!searchValue) {
    return rows;
  }

  return rows.filter(row => normalizeSearch(row.name).includes(searchValue));
}

function sortDetailRows(rows, sortValue) {
  const sortedRows = [...rows];

  sortedRows.sort((a, b) => {
    switch (sortValue) {
      case "ca-asc":
        return a.ca - b.ca;
      case "name-asc":
        return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
      case "name-desc":
        return b.name.localeCompare(a.name, "fr", { sensitivity: "base" });
      case "share-desc":
      case "ca-desc":
      default:
        return b.ca - a.ca;
    }
  });

  return sortedRows;
}

function updateDetailSegments() {
  document.querySelectorAll("[data-detail-type]").forEach(button => {
    const isActive = button.dataset.detailType === detailState.type;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function normalizeSearch(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
