// TopReboundsDetailedChart.jsx
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
      text: 'Top 20 Total Rebounds per Season (with ORB & DRB)',
    },
  },
};

const TopReboundsDetailedChart = ({ topTRB }) => {
  const playerNames = topTRB.map((player) => player.name);
  const playerTRB = topTRB.map((player) => player.TRB);
  const playerORB = topTRB.map((player) => player.ORB);
  const playerDRB = topTRB.map((player) => player.DRB);

  const data = {
    labels: playerNames,
    datasets: [
      {
        label: 'Total Rebounds',
        data: playerTRB,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Offensive Rebounds',
        data: playerORB,
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
      {
        label: 'Defensive Rebounds',
        data: playerDRB,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default TopReboundsDetailedChart;
