import React, { Component } from "react"
import Chart from "react-apexcharts"

class DountCharts extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.color)

    this.state = {
          
        series: [44, 55, 41],
        colors: ['#008FFB', '#00E396', '#FEB019'],
        options: {
            chart: {
                type: 'donut'
            },
            responsive: [
                    {
                    breakpoint: 480,
                    options: {
                    chart: {
                        width: 100
                    },
                    legend: {
                        position: 'bottom'
                    }
                    }
                }
            ]
        }
      }
    }

  render() {
    return (
      <div className="no_text">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={120}
        />

      </div>
    )
  }
}

export default DountCharts