let productChartInstance = null;
let cityChartInstance = null;

function initCharts(produits, villes) {
  destroyCharts();
  prepareChartFrames(produits.length, villes.length);

  productChartInstance = new Chart(document.getElementById("productChart"), {
    type: "bar",
    data: {
      labels: produits.map(([nom]) => nom),
      datasets: [{
        label: "CA par produit",
        data: produits.map(([, ca]) => ca),
        backgroundColor: colorsFor(produits.length),
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
        y: { beginAtZero: true, ticks: { callback: v => euro(v) } }
      }
    }
  });

  cityChartInstance = new Chart(document.getElementById("cityChart"), {
    type: "bar",
    data: {
      labels: villes.map(([ville]) => ville),
      datasets: [{
        label: "CA par ville",
        data: villes.map(([, ca]) => ca),
        backgroundColor: colorsFor(villes.length),
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
        x: { beginAtZero: true, ticks: { callback: v => euro(v) } }
      }
    }
  });
}

function destroyCharts() {
  if (productChartInstance) {
    productChartInstance.destroy();
    productChartInstance = null;
  }

  if (cityChartInstance) {
    cityChartInstance.destroy();
    cityChartInstance = null;
  }
}

function prepareChartFrames(productCount, cityCount) {
  const productFrame = document.getElementById("productChartFrame");
  const cityFrame = document.getElementById("cityChartFrame");
  const productBox = productFrame.parentElement;
  const cityBox = cityFrame.parentElement;
  const availableProductWidth = Math.max(280, productBox.clientWidth || 520);
  const isCompact = window.matchMedia("(max-width: 560px)").matches;

  const productWidth = Math.max(
    availableProductWidth,
    productCount * (isCompact ? 72 : 92)
  );
  const cityHeight = Math.max(280, cityCount * (isCompact ? 38 : 44));
  const maxCityViewportHeight = isCompact ? 420 : 560;

  productFrame.style.width = `${productWidth}px`;
  productFrame.style.height = isCompact ? "280px" : "300px";
  productBox.style.height = isCompact ? "300px" : "320px";

  cityFrame.style.width = "100%";
  cityFrame.style.height = `${cityHeight}px`;
  cityBox.style.height = `${Math.min(cityHeight, maxCityViewportHeight)}px`;
}
