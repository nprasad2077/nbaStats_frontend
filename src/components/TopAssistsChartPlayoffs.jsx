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
  scales: {
    x: {
      ticks: {
        beginAtZero: true,
      },
    },
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Top 20 Assists per Season',
    },
  },
};

const TopAssistsChartPlayoffs = ({ topAssists }) => {
  const playerNames = topAssists.map((player) => player.player_name);
  const playerAssists = topAssists.map((player) => player.AST);

  const data = {
    labels: playerNames,
    datasets: [
      {
        label: 'Assists',
        data: playerAssists,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default TopAssistsChartPlayoffs;
