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
import { scaleLinear } from "d3-scale";
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
    y: {
      stacked: true
    },
    x: {
      stacked: true,
    },
  }
};

const colorScale = scaleLinear()
  .domain([0, 10])
  .range(["#e7edff", "#003bde"]);

export function TopSourcesChart({ inputData, timeBuckets }) {
  var data = { labels: [], datasets: [] };
  var labels = Object.keys(timeBuckets);

  Object.keys(inputData).forEach((sourceName) => {

    console.log(inputData[sourceName]);
    console.log(Object.values(inputData[sourceName]));

    data.datasets.push({
      label: sourceName,
      data: Object.values(inputData[sourceName]),
      backgroundColor: colorScale(Object.values(inputData[sourceName]).reduce((a, b) => a + b, 0)),
      borderRadius: 10,
      borderWidth: 0
    });
  });

  data.labels = labels

  return <Bar options={options} data={data} />;
}
