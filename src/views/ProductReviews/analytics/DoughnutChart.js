// import React from 'react'
// import { Doughnut } from 'react-chartjs-2'

// const DoughnutChart = (props) => {
//     const {continent} = props

//     const continentOpt = {
//         allcontinents: {
//             data: [300, 50, 100, 200],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         },
//         africa: {
//             data: [300, 150, 100, 96],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         },
//         antarctica: {
//             data: [250, 50, 100],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         },
//         asia: {
//             data: [300, 50, 130],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         },
//         australia: {
//             data: [280, 70, 135],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         },
//         europe: {
//             data: [300, 286, 80],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         },
//         northamerica: {
//             data: [250, 1280, 180],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         },
//         southamerica: {
//             data: [90, 258, 100],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#57D580']
//         }
//   }

//   const dataset = continentOpt[continent]
//   const data = {
//     labels: ['Country 1', 'Country 2', 'Country 3', 'Country 4'],
//     datasets: [
//       {
//         data: dataset.data,
//         backgroundColor: dataset.backgroundColor,
//         hoverBackgroundColor: dataset.hoverBackgroundColor
//       }
//     ]
//   }

//   const options = {
//     plugins: {
//       legend: {
//         position: 'right'
//       }
//     },
//     layout: {
//       padding: {
//         top: 0,
//         bottom: 0
//       }
//     }
//   }

//   return (
//     <div className=' d-flex justify-content-center align-content-center' style={{width: "250px", marginLeft: "50%", transform: "translateX(-50%)"}}>
//       <Doughnut data={data} options={options} />
//     </div>
//   )
// }

// export default DoughnutChart

import React from 'react'
import Chart from 'react-apexcharts'

const DoughnutChart = (props) => {
  const { continent } = props

  const continentOpt = {
    allcontinents: {
      data: [300, 50, 100, 200]
    },
    africa: {
      data: [300, 150, 100, 96]
    },
    antarctica: {
      data: [250, 50, 100]
    },
    asia: {
      data: [300, 50, 130]
    },
    australia: {
      data: [280, 70, 135]
    },
    europe: {
      data: [300, 286, 80]
    },
    northamerica: {
      data: [250, 1280, 180]
    },
    southamerica: {
      data: [90, 258, 100]
    }
  }

  const options = {
    chart: {
      type: 'donut'
    },
    labels: ['Country 1', 'Country 2', 'Country 3', 'Country 4'],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '14px'
            },
            value: {
              fontSize: '14px'
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                return parseInt(total)
              }
            }
          }
        }
      }
    }
  }

  const series = continentOpt[continent].data

  return (
    <div className='d-flex justify-content-center'>
      <Chart options={options} series={series} type='donut' width={370} />
    </div>
  )
}

export default DoughnutChart
