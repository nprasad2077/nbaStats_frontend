// TopReboundsChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Top Rebounds by Category per Season',
    },
  },
};

const TopReboundsChart = ({ topTRB, topORB, topDRB }) => {
  const playerNames = [
    topTRB[0]?.name || 'N/A',
    topORB[0]?.name || 'N/A',
    topDRB[0]?.name || 'N/A',
  ];
  const playerRebounds = [
    topTRB[0]?.TRB || 0,
    topORB[0]?.ORB || 0,
    topDRB[0]?.DRB || 0,
  ];

  const data = {
    labels: playerNames,
    datasets: [
      {
        label: 'Rebounds',
        data: playerRebounds,
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 206, 86)',
          'rgb(255, 99, 132)',
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default TopReboundsChart;
