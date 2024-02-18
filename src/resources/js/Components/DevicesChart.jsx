import React from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip
);

const options = {
  cutout: '60%'
}

function buildData(inputData) {
  return {
    labels: inputData.map(inputItem => inputItem.device),
    datasets: [
      {
        data: inputData.map(inputItem => inputItem.count),
        backgroundColor: [
          '#35a2eb',
          '#20cfcf',
          '#ff3f69',
          '#ff901f',
          '#ffcd57'
        ],
        borderWidth: 0,
      },
    ],
  };
}


export function DevicesChart({ inputData }) {
  return <Doughnut options={options} data={buildData(inputData)} />
}
