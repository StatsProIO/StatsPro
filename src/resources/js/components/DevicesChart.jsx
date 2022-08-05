import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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
          '#2a63fee6',
          '#2a63feb0',
          '#2a63fe7a',
          '#2A63FE70',
          '#2A63FE59'
        ],
        borderWidth: 5,
      },
    ],
  };
}


export function DevicesChart({ inputData }) {
  return <Doughnut options={options} data={buildData(inputData)} />
}
