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

var lightPurple = '#a281ed';
var darkPurple = '#7f6dff';
var darkBlue = '#4782da';
var lightBlue = '#5fc9f9';
var lightestBlue = '#91e1ff';


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function createLinearGradient(element, color) {
  var gradient = element.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, hexToRGB(color, .6));
  gradient.addColorStop(.3, hexToRGB(color, .4));
  gradient.addColorStop(.9, hexToRGB(color, 0));
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
    scales: {
      y: {
        color: "green",
      }
    }
  },
};


function createLineChartDataset(data, label, backgroundColor, lineColor) {
  return {
    data: data,
    label: label,
    fill: true,
    backgroundColor: backgroundColor,
    borderWidth: 3,
    cubicInterpolationMode: 'monotone',
    borderColor: lineColor,
    pointBorderColor: lineColor,
    pointBackgroundColor: lineColor,
    pointHoverBackgroundColor: lineColor,
    pointHoverBorderColor: lineColor,
    pointRadius: 0
  }
}

export function PageviewsChart() {

  const chartRef = useRef(null);

  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      console.log('ChartJS', chart);







      var gradientLightPurple = createLinearGradient(chart.ctx, lightPurple);
      var gradientDarkBlue = createLinearGradient(chart.ctx, darkBlue);

      setData({
        labels,
        datasets: [
          createLineChartDataset([30, 1, 0, 12, 8, 9], 'followers', gradientDarkBlue, darkBlue)
        ],
      });


    }
  }, []);


  return <Line options={options} data={data} ref={chartRef} />
}
