const dataFileInput = document.getElementById("data-file");
const loadDataButton = document.getElementById("load-data");
const resetDataButton = document.getElementById("reset-data");
const dataStatus = document.getElementById("data-status");
const productLimitSelect = document.getElementById("product-limit");
const cityLimitSelect = document.getElementById("city-limit");
const productChartMeta = document.getElementById("product-chart-meta");
const cityChartMeta = document.getElementById("city-chart-meta");
let currentReportData = cloneReportData(DEFAULT_REPORT_DATA);
let resizeTimer = null;

loadDataButton.addEventListener("click", () => dataFileInput.click());
resetDataButton.addEventListener("click", () => {
  renderDashboard(DEFAULT_REPORT_DATA, "Données par défaut", "info");
});
dataFileInput.addEventListener("change", handleDataFileChange);
productLimitSelect.addEventListener("change", renderDashboardView);
cityLimitSelect.addEventListener("change", renderDashboardView);
window.addEventListener("resize", handleDashboardResize);

renderDashboard(DEFAULT_REPORT_DATA, "Données par défaut", "info");

function renderDashboard(data, message, statusType) {
  const normalizedData = normalizeReportData(data);

  currentReportData = cloneReportData(normalizedData);
  renderDashboardView();
  setDataStatus(message, statusType);
}

async function handleDataFileChange(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  try {
    const content = await file.text();
    const parsedData = parseReportDataFile(content);
    renderDashboard(parsedData, `Données chargées : ${file.name}`, "success");
  } catch (error) {
    setDataStatus(error.message, "error");
  } finally {
    dataFileInput.value = "";
  }
}

function sortedEntries(values) {
  return Object.entries(values).sort((a, b) => b[1] - a[1]);
}

function renderDashboardView() {
  const produits = sortedEntries(currentReportData.par_produit);
  const villes = sortedEntries(currentReportData.par_ville);
  const displayedProduits = limitEntries(produits, productLimitSelect.value);
  const displayedVilles = limitEntries(villes, cityLimitSelect.value);

  initKPIs(currentReportData, produits, villes);
  initInsights(currentReportData, produits, villes);
  initCharts(displayedProduits, displayedVilles);
  initDetailTable(currentReportData, produits, villes);
  updateChartMeta(productChartMeta, displayedProduits.length, produits.length);
  updateChartMeta(cityChartMeta, displayedVilles.length, villes.length);
}

function limitEntries(entries, limit) {
  if (limit === "all") {
    return entries;
  }

  return entries.slice(0, Number(limit));
}

function updateChartMeta(element, displayedCount, totalCount) {
  element.textContent = displayedCount === totalCount
    ? `${totalCount} éléments affichés.`
    : `${displayedCount} sur ${totalCount} éléments affichés.`;
}

function setDataStatus(message = "", type = "info") {
  dataStatus.textContent = message;
  dataStatus.className = "data-status";
  dataStatus.classList.add(type);
}

function handleDashboardResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    renderDashboardView();
  }, 150);
}
