import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function SlDashboardLineChart() {

  const series = [
    {
      name: 'Revenue',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      color: '#0143ff'
    }
  ]
  const options = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      row: {
        colors: ['#f8f8f8', 'transparent'],
        opacity: 0.1
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
  }
  return (
    <div id="chart" className='line-chart'>
      <ReactApexChart options={options} series={series} type="area" height={210} />
    </div>
  )
}