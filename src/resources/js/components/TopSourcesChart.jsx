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




export function TopSourcesChart({ inputData }) {

  var data = { datasets: [] };

  if (inputData.length > 0) {
    inputData.forEach((sourceData) => {

      data.datasets.push({

        label: sourceData.dates,
        data: sourceData.counts,


        backgroundColor: '#2a63fe57',
        borderRadius: 10,
        borderWidth: 0
      });
    });


    data.labels = ['2022-07-23', '2022-07-21']

    return <Bar options={options} data={data} />;
  }

  return <></>;
}
