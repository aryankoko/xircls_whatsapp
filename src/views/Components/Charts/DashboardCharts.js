import React, { Component } from "react"
import Chart from "react-apexcharts"

class Charts extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.color)
    console.log(this.props.percent)

    this.state = {
          
        series: [this.props.percent],
        options: {
            colors: [this.props.color],
            chart: {
            height: 150,
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '65%'
              }
            }
          },
          stroke: {
                lineCap: 'round'
            },
          labels: []
        }
      }
    }

  render() {
    return (
      <div className="no_text">
        <Chart
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height={150}
        />

      </div>
    )
  }
}

export default Charts