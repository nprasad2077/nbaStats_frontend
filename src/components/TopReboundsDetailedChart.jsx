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
      barPercentage: 0.6, // Adjust this value to control the bar width
      categoryPercentage: 0.8, // Adjust this value to control the space between bars
    },
  },
  responsive: true,
  scales: {
    y: {
      ticks: {
        padding: 10,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top 20 Rebounders by rebounds per game (with ORB & DRB)',
    },
  },
  bar: {
    groupSpacing: 10,
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
        barThickness: 10,
      },
      {
        label: 'Offensive Rebounds',
        data: playerORB,
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        barThickness: 10,
      },
      {
        label: 'Defensive Rebounds',
        data: playerDRB,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        barThickness: 10,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default TopReboundsDetailedChart;
