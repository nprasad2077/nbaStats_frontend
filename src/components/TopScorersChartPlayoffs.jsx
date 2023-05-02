import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { LinearScale } from 'chart.js/auto';

Chart.register(LinearScale);

const TopScorersChart = ({ topScorers }) => {
  const playerNames = topScorers.map((player) => player.player_name);
  const playerPoints = topScorers.map((player) => player.PTS);

  const data = {
    labels: playerNames,
    datasets: [
      {
        label: 'Points',
        data: playerPoints,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TopScorersChart;
