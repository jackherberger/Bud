import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DateBarChart = ({ transactions }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const groupedTransactions = transactions.reduce((groups, transaction) => {
      const { date } = transaction;
      if (!groups[date]) {
        groups[date] = 0;
      }
      groups[date] += transaction.price;
      return groups;
    }, {});

    const chartData = {
      labels: Object.keys(groupedTransactions),
      datasets: [
        {
          label: 'Spending per Date',
          data: Object.values(groupedTransactions),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    if (chartRef.current) {
      // Destroy the existing chart if it exists
      chartRef.current.destroy();
    }

    // Render the bar chart
    const ctx = document.getElementById('date-bar-chart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [transactions]);

  return (
    <div>
      <canvas id="date-bar-chart" />
    </div>
  );
};

export default DateBarChart;
