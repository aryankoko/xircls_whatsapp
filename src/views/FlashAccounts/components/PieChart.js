import React from 'react'
import { Pie } from 'react-chartjs-2'

const PieChart = ({ labels, data }) => {
    // console.log(labels, data)
    const chartData = {
        labels,
        datasets: [
          {
            label: '# of Votes',
            data,
            backgroundColor: [
              '#4bc0c0',
              '#ff9f40',
              '#36a2eb',
              '#ffcd56'
            ],
            borderWidth: 1
          }
        ]
      }

    return  <Pie data={chartData} width={'100%'} height={'100%'} />
}

export default PieChart