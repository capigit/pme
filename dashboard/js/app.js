const produits = Object.entries(reportData.par_produit).sort((a, b) => b[1] - a[1]);
const villes   = Object.entries(reportData.par_ville).sort((a, b) => b[1] - a[1]);

initKPIs(produits, villes);
initCharts(produits, villes);
