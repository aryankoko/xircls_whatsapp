import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChartWithCustomLegend = ({ loyaltyData1 }) => {
  const total = loyaltyData1.loyalty + loyaltyData1.nonLoyalty
//   const loyaltyPercentage = ((loyaltyData.loyalty / total) * 100).toFixed(2)
//   const nonLoyaltyPercentage = ((loyaltyData.nonLoyalty / total) * 100).toFixed(2)

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Sample x-axis labels
    datasets: [
      {
        label: 'Loyalty',
        data: [20, 30, 25, 40, 50, 60, 70], // Replace with your actual data
        borderColor: '#36A2EB',
        fill: false
      },
      {
        label: 'Non-Loyalty',
        data: [80, 70, 75, 60, 50, 40, 30], // Replace with your actual data
        borderColor: '#FF6384',
        fill: false
      }
    ]
  }

  const legendCallback = (chart) => {
    const text = []
    text.push('<ul class="chartjs-legend">')

    if (chart.data.datasets.length) {
      for (let i = 0; i < chart.data.datasets.length; i++) {
        const dataset = chart.data.datasets[i]
        const value = dataset.data[dataset.data.length - 1] // Get the last value in the dataset
        const label = dataset.label || ''

        text.push('<li>')
        text.push(`<span class="chartjs-legend-item" style="border-color: ${dataset.borderColor}"></span>`)
        text.push(`<span class="chartjs-legend-text">${label}: ${value} (${((value / total) * 100).toFixed(2)}%)</span>`)
        text.push('</li>')
      }
    }

    text.push('</ul>')
    return text.join('')
  }

  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'right',
        labels: {
          generateLabels: (chart) => legendCallback(chart)
        }
      }
    }
  }

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChartWithCustomLegend
