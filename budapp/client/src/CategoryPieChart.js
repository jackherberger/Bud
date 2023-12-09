import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const CategoryPieChart = ({ transactions }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (transactions.length === 0) {
      // Display a message when there are no transactions
      return
    }

    if (chartRef.current) {
      // Destroy the existing chart if it exists
      chartRef.current.destroy()
    }

    // Group transactions by category
    const groupedTransactions = transactions.reduce((groups, transaction) => {
      const { category } = transaction
      if (!groups[category]) {
        groups[category] = 0
      }
      groups[category] += parseInt(transaction.price)
      return groups
    }, {})

    const categoryNames = Object.keys(groupedTransactions)
    const backgroundColors = generateRandomColors(categoryNames.length)

    const chartData = {
      labels: categoryNames,
      datasets: [
        {
          data: Object.values(groupedTransactions),
          backgroundColor: backgroundColors
        }
      ]
    }

    // Render the pie chart
    const ctx = document.getElementById('category-pie-chart').getContext('2d')
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: chartData
    })
  }, [transactions])

  // Generate random colors for the categories
  const generateRandomColors = (count) => {
    const colors = []
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.6)`
      colors.push(color)
    }
    return colors
  }

  return (
    <div>
      <canvas id='category-pie-chart' />
      {transactions.length === 0 && <p>No transactions to display.</p>}
    </div>
  )
}

export default CategoryPieChart
