import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);


const donutData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        '#1b73e8e6',
        '#1b73e8b0',
        '#1b73e87a',
      ],
      borderWidth: 0,
    },
  ],
};


export function DevicesChart() {
  return <Doughnut data={donutData} />
}
