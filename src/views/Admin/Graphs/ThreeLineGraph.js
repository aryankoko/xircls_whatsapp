import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ThreeLineGraph = ({height}) => {
  const series = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51]
    },
    {
      data: [12, 65, 45, 85]
    },
    {
      data: [11, 66, 55, 35]
    }
  ]

  const options = {
    chart: {
      height: {height},
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    // title: {
    //   text: 'Product Trends by Month',
    //   align: 'left'
    // },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr']
    },
    markers: {
      size: 0
    }
  }

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={height} />
    </div>
  )
}

export default ThreeLineGraph