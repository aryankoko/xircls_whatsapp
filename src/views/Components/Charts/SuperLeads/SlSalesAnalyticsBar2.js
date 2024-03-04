import React, { useContext } from 'react'
import ReactApexChart from 'react-apexcharts'
import { PermissionProvider } from '../../../../Helper/Context'

export default function SlSalesAnalyticsBar2() {
  const {userPermission} = useContext(PermissionProvider)
    const series = [
        {
          name: 'SuperLeadz',
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: 'Others',
          data: [13, 23, 20, 8, 13, 27]
        }
      ]
    
      const options = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '01/01/2011 GMT',
            '01/02/2011 GMT',
            '01/03/2011 GMT',
            '01/04/2011 GMT',
            '01/05/2011 GMT',
            '01/06/2011 GMT'
          ],
          title: {
            text: 'Days'
          }
        },
        yaxis: {
          labels: {
            formatter: (value) => `${userPermission?.currencySymbol} ${value} `
          },
            title: {
              text: 'Revenue (in Lakhs)'
            }
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        },
        colors: ['#ade255', '#55e28a']
      }
    
      return (
        <div id="chart">
          <ReactApexChart options={options} series={series} type="bar" height={300} />
        </div>
      )
}
