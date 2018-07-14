import React, {Component} from 'react'
import {Pie} from 'react-chartjs-2';

class Chart extends Component {
  render() {
    const data = {
      labels: this.props.options,
      datasets: [
        {
          data: this.props.data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56'
          ],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    }
    return (
        <Pie width={100} height={100} data={data}/>
    )
  }
}

export default Chart
