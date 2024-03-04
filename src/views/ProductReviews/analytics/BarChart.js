import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarChart = (props) => {
  const { startMonth, endMonth, monthData } = props

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const handleGenerate = () => {
    const startMonthIndex = parseInt(startMonth)
    const endMonthIndex = parseInt(endMonth)
    const data = Object.values(monthData)
    // const data = [65, 29, 60, 91, 56, 45, 60, 30, 56, 40, 73, 15]

    if (!isNaN(startMonthIndex) && !isNaN(endMonthIndex)) {
      const selectedMonths = []

      if (endMonthIndex >= startMonthIndex) {
        selectedMonths.push(...months.slice(startMonthIndex, endMonthIndex + 1))
      } else {
        selectedMonths.push(...months.slice(startMonthIndex))
        selectedMonths.push(...months.slice(0, endMonthIndex + 1))
      }
      return { selectedMonths, data: data.splice(0, selectedMonths.length) }
    } else {
      return {
        selectedMonths: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        data
      }
    }
  }

  const monthlySalesData = {
    labels: handleGenerate().selectedMonths,
    datasets: [
      {
        label: 'Reviews Growth',
        backgroundColor: 'rgba(116, 105, 239, 0.5)',
        borderColor: 'rgba(116, 105, 239, 0.5)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(116, 105, 239, 255)',
        hoverBorderColor: 'rgba(116, 105, 239, 255)',
        data: handleGenerate().data
      }
    ]
  }

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Total reviews',
          font: {
            size: 13
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className=' mb-2 ' style={{ height: '500px' }}>
      <Bar
        data={monthlySalesData}
        width={100}
        height={50}
        options={chartOptions}
      />
    </div>
  )
}

export default BarChart