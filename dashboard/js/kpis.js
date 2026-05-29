function initKPIs(produits, villes) {
  document.getElementById("ca-total").textContent =
    reportData.chiffre_affaires_total.toLocaleString("fr-FR") + " €";

  const medals = ["🥇", "🥈", "🥉"];
  const rankingEl = document.getElementById("ranking");
  produits.slice(0, 3).forEach(([nom, ca], i) => {
    const div = document.createElement("div");
    div.innerHTML = `<span>${medals[i]} ${nom}</span><span>${euro(ca)}</span>`;
    rankingEl.appendChild(div);
  });

  document.getElementById("kpi-top-produit").textContent = produits[0][0];
  document.getElementById("kpi-top-ville").textContent   = villes[0][0];
  document.getElementById("kpi-ecart").textContent       =
    euro(villes[0][1] - villes[villes.length - 1][1]);
  document.getElementById("kpi-nb-produits").textContent = produits.length;
  document.getElementById("kpi-nb-villes").textContent   = villes.length;
}
