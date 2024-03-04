import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function AreaChart() {

  const series = [
    {
      name: 'Revenue',
      data: [60, 81, 55, 81, 159, 139, 69, 51, 78, 50],
      color: '#7367F0'
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
      show: false,
      row: {
        colors: ['#f8f8f891', 'transparent'],
        opacity: 0.1
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
  }
  return (
    <div id="chart" className='line-chart' style={{margin: '0px 0p 0px -40px'}}>
      <ReactApexChart options={options} series={series} type="area" width="100%" height={210} />
    </div>
  )
}