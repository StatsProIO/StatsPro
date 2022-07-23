import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  elements: {
    bar: {
      borderWidth: 50,

    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
  },
  scales: {
    x: {
      stacked: true,
      barThickness: 1
    },
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [

    {
      label: 'Dataset 2',
      data: labels.map(() => 22),

      backgroundColor: '#1b73e857',
      borderRadius: 10,
      borderWidth: 0
    },

    {
      label: 'Dataset 1',
      data: labels.map(() => 5),

      backgroundColor: '#1b73e857',
      borderRadius: 10,
      borderWidth: 0
    },

    {
      label: 'Dataset 1',
      data: labels.map(() => 95),

      backgroundColor: '#1b73e857',
      borderRadius: 10,
      borderWidth: 0
    },

    {
      label: 'Dataset 1',
      data: labels.map(() => 12),

      backgroundColor: '#1b73e857',
      borderRadius: 10,
      borderWidth: 0
    },

  ],
};

export function TopSourcesChart() {
  return <Bar options={options} data={data} />;
}
