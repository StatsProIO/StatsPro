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
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 0,
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
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    legend: {
        labels: {
            // This more specific font property overrides the global property
            fontColor: 'black'
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => 95),
            backgroundColor: 'rgba(236, 236, 236, 0.4)',
        }
    ],
};

export function PageviewsMiniChart() {
    return <Bar options={options} data={data} />;
}
