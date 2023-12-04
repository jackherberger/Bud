// ChartComponent.js
import React, { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

function ChartComponent({ balance, income, savings, spendings }) {
  const chartRef = useRef(null)

  useEffect(() => {
    let newChartInstance = null

    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }

      const ctx = chartRef.current.getContext("2d")
      newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Balance", "Income", "Savings", "Spendings"],
          datasets: [
            {
              label: "Amount",
              data: [balance, income, savings, spendings],
              backgroundColor: ["blue", "orange", "green", "red"], // Adjust colors
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
      })
    }

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy()
      }
    }
  }, [balance, income, savings, spendings])

  return (
    <div style={{ width: "500px", height: "250px", margin: "40px" }}>
      <canvas ref={chartRef} />
    </div>
  )
}

export default ChartComponent
