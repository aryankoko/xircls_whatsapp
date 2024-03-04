import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Polar = ({ labels, data }) => {
    console.log(labels, data)
    const options = {
        series: data,
        labels,
        chart: {
            type: 'polarArea'
        },
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 1,
            colors: ['#36a2eb', '#4bc0c0', '#ff9f40', '#ff6384']
        },
        legend: {
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            labels: {
                fontSize: 'px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: ['#36a2eb', '#4bc0c0', '#ff9f40', '#ff6384'],
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
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
        ]
    }

    return (
        <div>
            <ReactApexChart options={options} series={options.series} type="polarArea" height={400} />
        </div>
    )
}

export default Polar