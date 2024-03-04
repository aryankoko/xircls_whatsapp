import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function LineChart ({ data }) {

  let date_list = []
  let value_list = []

  if (data) {
    date_list = data.map((curElem) => {
      return curElem.date
    })

    value_list = data.map((curElem) => {
      return curElem.count
    })

  }

  const series = [
    {
    name: 'Revenue',
    data: value_list,
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
            colors: ['#f8f8f891', 'transparent'],
            opacity: 0.1
          }
        },
    xaxis: {
        categories: date_list
    }
  }
  return (
    <div id="chart" className='line-chart'>
      <ReactApexChart options={options} series={series} type="area" height={210} />
    </div>
  )
}