import React from 'react'
import ReactApexChart from 'react-apexcharts'
// import { PermissionProvider } from '../../../../Helper/Context'

export default function SlSalesAnalyticsPie2() {
  // const {userPermission} = useContext(PermissionProvider)
    const series = [30, 70]
    const options = {
      chart: {
        type: 'donut'
      },
      dataLabels: {
        enabled: true,
        formatter: series => {
          const percentage = Math.floor(series)
          return `${percentage}%`
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true
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
      colors: ['#e2cf56', '#55e28a']
    }

  return (
    <div id="chart" className='sl-pie-chart-1'>
      <ReactApexChart options={options} series={series} type="donut" height={250} />
      {/* <div style={{
          position: 'absolute',
          top: '50%',
          left: '35%',
          transform: 'translate(-50%, -50%)',
          fontSize: '16px'
        }} className="custom-text" > Total<br /> {userPermission?.currencySymbol}2.5M </div> */}
    </div>
  )
}
