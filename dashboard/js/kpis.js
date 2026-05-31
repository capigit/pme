function initKPIs(data, produits, villes) {
  document.getElementById("ca-total").textContent = euro(data.chiffre_affaires_total);

  const positions = ["1.", "2.", "3."];
  const rankingEl = document.getElementById("ranking");
  rankingEl.replaceChildren();

  produits.slice(0, 3).forEach(([nom, ca], i) => {
    const div = document.createElement("div");
    const name = document.createElement("span");
    const value = document.createElement("span");

    name.textContent = `${positions[i]} ${nom}`;
    value.textContent = euro(ca);

    div.append(name, value);
    rankingEl.appendChild(div);
  });

  document.getElementById("kpi-top-produit").textContent = produits[0][0];
  document.getElementById("kpi-top-ville").textContent = villes[0][0];
  document.getElementById("kpi-ecart").textContent =
    euro(villes[0][1] - villes[villes.length - 1][1]);
  document.getElementById("kpi-nb-produits").textContent = produits.length;
  document.getElementById("kpi-nb-villes").textContent = villes.length;
}
