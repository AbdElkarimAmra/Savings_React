// pieChart.js
import Chart from "chart.js/auto";

export function createAcquisitionsChart(canvasEl, data) {
  if (!canvasEl || !data || !data.report) return;

  const needs = data.report.needs || {};
  let totalPercentageNeeds = 0;
  for (const key in needs) {
    const item = needs[key];
    if (item && typeof item.actualPercent === "number") {
      totalPercentageNeeds += item.actualPercent;
    }
  }

  const wants = data.report.wants || {};
  let totalPercentageWants = 0;
  for (const key in wants) {
    const item = wants[key];
    if (item && typeof item.actualPercent === "number") {
      totalPercentageWants += item.actualPercent;
    }
  }

  const savingsDebt = data.report.savingsDebt || {};
  let totalPercentageSavingsDebt = 0;
  for (const key in savingsDebt) {
    const item = savingsDebt[key];
    if (item && typeof item.actualPercent === "number") {
      totalPercentageSavingsDebt += item.actualPercent;
    }
  }

  const totalPercentage =
    totalPercentageNeeds + totalPercentageWants + totalPercentageSavingsDebt;
  const unallocatedPercentage = Math.max(0, 100 - totalPercentage);

  const labels = ["Needs", "Wants", "Savings & Debt", "Unallocated"];
  const values = [
    totalPercentageNeeds,
    totalPercentageWants,
    totalPercentageSavingsDebt,
    unallocatedPercentage,
  ];

  return new Chart(canvasEl, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ["#FF7F50", "#FDBA74", "#34D399", "#A5B4FC"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}
