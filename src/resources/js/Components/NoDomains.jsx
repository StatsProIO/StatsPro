import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);


function buildData(inputData) {
  return {
    labels: inputData.map((inputItem) => { return inputItem.device }),
    datasets: [
      {
        data: inputData.map((inputItem) => { return inputItem.count }),
        backgroundColor: [
          '#2a63fee6',
          '#2a63feb0',
          '#2a63fe7a',
          '#2A63FE70',
          '#2A63FE59'
        ],
        borderWidth: 0,
      },
    ],
  };
}


export function NoDomains({ inputData }) {

  return <>
    <Typography>
      Add your first domain!
      </Typography>
    </>
}
