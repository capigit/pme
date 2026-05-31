function initInsights(data, produits, villes) {
  const total = data.chiffre_affaires_total;
  const [topProductName, topProductCa] = produits[0];
  const [topCityName, topCityCa] = villes[0];
  const productShare = total > 0 ? (topProductCa / total) * 100 : 0;
  const cityShare = total > 0 ? (topCityCa / total) * 100 : 0;

  document.getElementById("insight-product-share").textContent = percent(productShare);
  document.getElementById("insight-product-detail").textContent =
    `${topProductName} représente ${euro(topProductCa)}.`;

  document.getElementById("insight-city-share").textContent = percent(cityShare);
  document.getElementById("insight-city-detail").textContent =
    `${topCityName} représente ${euro(topCityCa)}.`;

  updateConsistencyInsight(data, produits, villes);
}

function updateConsistencyInsight(data, produits, villes) {
  const total = data.chiffre_affaires_total;
  const productGap = Math.abs(total - sumEntries(produits));
  const cityGap = Math.abs(total - sumEntries(villes));
  const maxGap = Math.max(productGap, cityGap);
  const consistencyCard = document.getElementById("insight-consistency-card");
  const consistencyLabel = document.getElementById("insight-consistency");
  const consistencyDetail = document.getElementById("insight-consistency-detail");

  consistencyCard.classList.remove("warning", "success");

  if (maxGap <= 0.05) {
    consistencyCard.classList.add("success");
    consistencyLabel.textContent = "OK";
    consistencyDetail.textContent = "Le total correspond aux répartitions.";
    return;
  }

  consistencyCard.classList.add("warning");
  consistencyLabel.textContent = "À vérifier";
  consistencyDetail.textContent =
    `Écart produits : ${euro(productGap)} · écart villes : ${euro(cityGap)}.`;
}
