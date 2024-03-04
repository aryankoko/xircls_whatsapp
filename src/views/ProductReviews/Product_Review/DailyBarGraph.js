import React from 'react'
import { Bar } from 'react-chartjs-2'
// import barBorderRadiusPlugin from './barBorderRadiusPlugin'
// import './chartjs-plugin-rounded-bars'

function greenBg () {
  const array = [20, 40, 60, 80, 100, 80, 60]
  const maxValue = Math.max(...array)

  const bg = array.map(a => (a === maxValue ? "rgba(40, 199, 111, 0.85)" : "rgba(40, 199, 111, 0.16)"))
  return bg
};

const data = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      data: [20, 40, 60, 80, 100, 80, 60],
      backgroundColor: greenBg(),
      barThickness: 10,
      borderRadius:10,
      border:0,
      borderSkipped: 'bottom'
    }
  ]
}

const chartOptions = {
  // maintainAspectRatio: false,
  // plugins: {
  //   roundedBars: {
  //     borderRadius: 10
  //   }
  // },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
        drawBorder: false, // Hide the border
        drawOnChartArea: false  
      }
    },
    y: {
      beginAtZero: true,
      display: false,
      grid: {
        display: false
      }
    }
  },
    plugins: {
      legend: {
        display: false
      }
    }
  
}

const DailyBarGraph = () => {
  data.datasets[0].barPercentage = 0.5

  return (
    <div style={{ width: '19rem', height: '200px'}}>
      <Bar data={data} width={100} height={65} options={chartOptions} />
    </div>
  )
}

export default DailyBarGraph

