// ChartComponent.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ChartComponent({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let newChartInstance = null;

    if (chartRef.current && data) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Balance", "Income", "Savings"],
          datasets: [
            {
              label: "Amount",
              data: [data.balance, data.income, data.saving],
              backgroundColor: ["blue", "orange", "green"],
              barThickness: 80, // Adjust bar width
            },
          ],
        },
        options: {
          indexAxis: "x", // Change orientation to horizontal
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ width: "500px", height: "250px", margin: "40px" }}>
      {" "}
      {/* Adjust width and margin */}
      <canvas ref={chartRef} />
    </div>
  );
}

export default ChartComponent;
