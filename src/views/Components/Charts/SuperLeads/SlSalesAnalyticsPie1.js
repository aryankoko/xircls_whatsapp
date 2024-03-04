import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function SlSalesAnalyticsPie1() {
    
    const series = [12, 87]
    const options = {
      chart: {
        type: 'donut'
      },
      dataLabels: {
        enabled: true,
        formatter: series => {
          const percentage = Math.floor(series)
          return `${percentage}%`
        },
        style: {
          fontSize: '13px',
          colors: ['#ffffff']
          // offsetY: 10
        },
        position: 'center',
        textAnchor: 'middle'
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total'
              },
              value: {
                fontSize: '20px' // Adjust the font size of the numbers on the pie chart
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      labels: ['SuperLeadz', 'Others'],
      colors: ['#ade255', '#55e28a']
    }

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="donut" height={250} />
      {/* <div style={{
          position: 'absolute',
          top: '50%',
          left: '35%',
          transform: 'translate(-50%, -50%)',
          fontSize: '16px'
        }} className="custom-text" > Total<br /> 1.3K </div> */}
    </div>
  )
}
