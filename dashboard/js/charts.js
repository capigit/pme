function initCharts(produits, villes) {
  new Chart(document.getElementById("productChart"), {
    type: "bar",
    data: {
      labels: produits.map(([nom]) => nom),
      datasets: [{
        label: "CA par produit",
        data: produits.map(([, ca]) => ca),
        backgroundColor: COLORS.slice(0, produits.length),
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => euro(ctx.raw) } }
      },
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => v + " €" } }
      }
    }
  });

  new Chart(document.getElementById("cityChart"), {
    type: "bar",
    data: {
      labels: villes.map(([ville]) => ville),
      datasets: [{
        label: "CA par ville",
        data: villes.map(([, ca]) => ca),
        backgroundColor: COLORS.slice(0, villes.length),
        borderRadius: 8
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => euro(ctx.raw) } }
      },
      scales: {
        x: { beginAtZero: true, ticks: { callback: v => v + " €" } }
      }
    }
  });
}
