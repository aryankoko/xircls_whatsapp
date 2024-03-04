import moment from 'moment/moment'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function SlHeatmapAnalyticsChart({ heatMapData }) {
  console.log("heatMapData", heatMapData)

  // const generateData = (count, range) => {
  //   const data = []
  //   for (let i = 0; i < count; i++) {
  //     data.push({
  //       x: `${i}-${i + 1}`,
  //       y: Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
  //     })
  //   }
  //   return data
  // }

  const series = heatMapData.map(hmdata => {
    return {
      name: moment(hmdata.date).format('dddd'),
      data: hmdata.data
    }
  })

  console.log({series})

  const options = {
    grid: {
      show: true,
      borderColor: '#90A4AE',
      strokeDashArray: 1,
      position: 'front',
      xaxis: {
          lines: {
              show: false
          },
          title: {
            text: 'xaxis'
          }
      },
      yaxis: {
        lines: {
          show: true // Enable horizontal grid lines
        }, 
        title: {
          text: 'yaxis'
        },
      row: {
          colors: undefined,
          opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    chart: {
      height: 350,
      type: 'heatmap',
      toolbar: {
        show: false
      }
      // background: '#c0c0c0'
      // sparkline: {
      //   enabled: false
      // }
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              name: "Quiet Period",
              color: "rgba(228,226,252,1)"
            },
            {

              name: "Low Traffic",
              color: "rgba(193,188,248,1)"
            },
            {

              name: "Busy",
              color: "rgba(186,181,248,1)"
            },
            {
              name: "Peak Traffic",
              color: "#7367f0"
            }
          ]
        }
      }
    },
    
    colors: ['#7367f0'],
    legend: {
      offsetY:5,
      horizontalAlign: 'center',
      markers: {
        offsetY: -0.5
      }
    }
  },
  xaxis: {
    type: 'category',
    
    title: {
      text: 'No. of Visitors'
    }
  },
  yaxis: {
      labels: {
         enabled:true
      },
      title: {
        text: 'Days'
      }
  },
  dataLabels: {
    enabled: true
  }
}

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="heatmap" height={350} />
    </div>
  )
}
