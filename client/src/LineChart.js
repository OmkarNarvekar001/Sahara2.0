import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'],
  datasets: [
    {
      label: '# of Donations',
      data: [12, 19, 3, 5, 2, 3, 10,7,9,8,12,15],
      fill: false,
      backgroundColor: '#4267B2',
      borderColor: '#4267B2',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = ({x,y}) => (
  <div>
    {/* <div className='header'>
      <h1 className='title'>Line Chart</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
        >
          Github Source
        </a>
      </div>
    </div> */}
    <Line data={{
      labels: x,
  datasets: [
    {
      label: '# of Donations',
      data:y,
      fill: false,
      backgroundColor: '#4267B2',
      borderColor: '#4267B2',
    },
  ],}} options={options} />
  </div>
);

export default LineChart;