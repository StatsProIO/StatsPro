import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

var darkBlue = '#2a63fe';

function createLinearGradient(element, color) {
  var gradient = element.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, hexToRGB(color, .6));
  gradient.addColorStop(.7, hexToRGB(color, .2));
  gradient.addColorStop(1, hexToRGB(color, 0));
  return gradient;
}

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function PageviewsChart({ inputData }) {
  const chartRef = useRef(null);

  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {

      var gradientDarkBlue = createLinearGradient(chart.ctx, darkBlue);

      setData({
        labels: inputData.map(dataPoint => dataPoint.date),
        datasets: [
          {
            data: inputData.map((dataPoint) => { return dataPoint.count; }),
            fill: true,
            backgroundColor: gradientDarkBlue,
            borderWidth: 3,
            cubicInterpolationMode: 'monotone',
            borderColor: darkBlue,
            pointBorderColor: darkBlue,
            pointBackgroundColor: darkBlue,
            pointHoverBackgroundColor: darkBlue,
            pointHoverBorderColor: darkBlue,
            pointRadius: 0
          }
        ],
      });


    }
  }, [inputData, chartRef]);


  return <Line options={options} data={data} ref={chartRef} />
}
