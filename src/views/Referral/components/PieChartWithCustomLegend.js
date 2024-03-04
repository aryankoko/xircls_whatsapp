// import React from 'react'
// import { Pie } from 'react-chartjs-2'

// const PieChartComponent = ({ loyaltyData }) => {
//   // Assuming loyaltyData is an object with loyalty and non-loyalty counts
//   const data = {
//     labels: ['Loyalty', 'Non-Loyalty'],
//     datasets: [
//       {
//         data: [loyaltyData.loyalty, loyaltyData.nonLoyalty],
//         backgroundColor: ['#36A2EB', '#FF6384']
//       }
//     ]
//   }

//   return (
//     <div>
//       <Pie data={data} />
//     </div>
//   )
// }

// export default PieChartComponent


import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const PieChartWithCustomLegend = ({ loyaltyData }) => {
  const total = loyaltyData.loyalty + loyaltyData.nonLoyalty
//   const loyaltyPercentage = ((loyaltyData.loyalty / total) * 100).toFixed(2)
//   const nonLoyaltyPercentage = ((loyaltyData.nonLoyalty / total) * 100).toFixed(2)

  const data = {
    labels: ['Loyalty', 'Non-Loyalty'],
    datasets: [
      {
        data: [loyaltyData.loyalty, loyaltyData.nonLoyalty],
        backgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  }

  const legendCallback = (chart) => {
    const text = []
    text.push('<ul class="chartjs-legend">')
    const { data: chartData } = chart

    if (chartData.labels.length) {
      for (let i = 0; i < chartData.labels.length; i++) {
        text.push('<li>')
        text.push(`<span class="chartjs-legend-item" style="background-color: ${chartData.datasets[0].backgroundColor[i]}"></span>`)
        text.push(`<span class="chartjs-legend-text">${chartData.labels[i]}: ${chartData.datasets[0].data[i]} (${((chartData.datasets[0].data[i] / total) * 100).toFixed(2)}%)</span>`)
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
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default PieChartWithCustomLegend
