import React from 'react'
import ReactApexChart from 'react-apexcharts'
export default function BarChart({ data, filterOption, loading}) {
    console.log(data?.graphData, "pppp")
    const  isDataBeingFetched = loading
    const graphOption = filterOption?.options.find(
        (option) => option.value === filterOption.graphTitle
    )

    const options = {
        chart: {
            height: 350,
            type: 'bar'
        },
        colors: ["#006aff"],
        plotOptions: {
            bar: {
                borderRadius: 0,
                columnWidth: '50%',
                distributed: false
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: data?.map((cur) => {
                return cur.state ? cur.state : 'Other'
            }),
            labels: {
                style: {
                    // colors: ["#7367f0"],
                    fontSize: '12px'
                }
            },
            title: {
                text: 'Location'
            }
        },
        yaxis: {
            title: {
              text: graphOption?.yAxis || ""
            }
        },
        tooltip: {
            y: {
                formatter: (val) => val
            }
        },
        noData: {  
            text: isDataBeingFetched ? "Loading..." : "No Data present in the graph!",  
            align: 'center',  
            verticalAlign: 'middle',  
            offsetX: 0,  
            offsetY: 0,  
            style: {  
            color: "#000000",  
            fontSize: '14px',  
            fontFamily: "Helvetica"  
            }  
        }
        
    }

    const count = [
        {
            name: "Count",
            data: data?.map((cur) => {
                return cur.count
            })
        }
    ]
    return (
        <div className='bar-chart'>
            <ReactApexChart options={options} series={count} type="bar" height={'330px'} />
        </div>
    )
}