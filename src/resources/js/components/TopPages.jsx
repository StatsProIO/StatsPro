import React, { useEffect, useRef, useState } from 'react';
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

var darkBlue = '#2a63fe';

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

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
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
};

function createLinearGradient(element, color) {
    var gradient = element.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, hexToRGB(color, .6));
    gradient.addColorStop(.3, hexToRGB(color, .4));
    gradient.addColorStop(.9, hexToRGB(color, 0));
    return gradient;
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    datasets: [],
};

export function TopPages() {

    const chartRef = useRef(null);

    const [data, setData] = useState({ datasets: [] });

    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {
            var gradientDarkBlue = createLinearGradient(chart.ctx, darkBlue);

            setData({
                labels,
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: labels.map(() => 95),
                        backgroundColor: gradientDarkBlue,
                        borderRadius: 10,
                        borderWidth: 0
                    }
                ],
            });


        }
    }, []);



    return <Bar options={options} data={data} ref={chartRef} />;
}
