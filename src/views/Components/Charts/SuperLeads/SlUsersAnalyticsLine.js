import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function SlUsersAnalyticsLine({graphData}) {
    const data = graphData?.map((graph => {
        return graph.cust_visit
    }))

    const categories = graphData?.map((graph => {
        return graph.visit_date
    }))
    console.log(graphData, data)


    const series = [
        {
            name: "Users",
            data
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
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            }
        },
        // xaxis: {
        //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        // },
        xaxis: {
            type: 'datetime',
            categories,
            title: {
                text: "Date"
            }
        },
        yaxis: {
            title: {
                text: 'No. of Visitors'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#7367f0'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            }
        }
    }

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={300} />
        </div>
    )
}
