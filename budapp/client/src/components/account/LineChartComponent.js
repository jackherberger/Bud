// LineChartComponent.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChartComponent({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let newChartInstance = null;

    if (chartRef.current && data) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Sample labels (months)
          datasets: [
            {
              label: "Balance",
              data: data.balanceData, // An array of balance data over time
              borderColor: "blue",
              fill: false,
            },
            {
              label: "Income",
              data: data.incomeData, // An array of income data over time
              borderColor: "orange",
              fill: false,
            },
            {
              label: "Savings",
              data: data.savingsData, // An array of savings data over time
              borderColor: "green",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Amount",
              },
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
    <div style={{ width: "400px", margin: "20px" }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default LineChartComponent;
