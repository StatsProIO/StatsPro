import React, {useEffect, useRef, useState} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale} from 'chart.js';
import {Line} from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

var darkBlue = '#2a63fe';
var purple = '#6917ff'

function createLinearGradient(element, color, size) {
  var gradient = element.createLinearGradient(0, 0, 0, size);
  gradient.addColorStop(0, hexToRGB(color, .6));
  gradient.addColorStop(.7, hexToRGB(color, .4));
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
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  plugins: {
    legend: {
      display: true,
    },
  }
};

export function LineChart({ inputData, label }) {
  const chartRef = useRef(null);

  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {

      var gradientDarkBlue = createLinearGradient(chart.ctx, darkBlue, 400);

      setData({
        labels: Object.keys(inputData),
        datasets: [
          {
            label: label,
            data: Object.values(inputData),
            fill: true,
            backgroundColor: gradientDarkBlue,
            borderWidth: 3,
            cubicInterpolationMode: 'monotone',
            borderColor: darkBlue,
            pointBorderColor: darkBlue,
            pointBackgroundColor: darkBlue,
            pointHoverBackgroundColor: darkBlue,
            pointHoverBorderColor: darkBlue,
            pointRadius: 1
          }
        ],
      });


    }
  }, [inputData, chartRef]);


  return <Line options={options} data={data} ref={chartRef} />
}
