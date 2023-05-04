import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import { LinearScale } from "chart.js/auto";

Chart.register(LinearScale);

const TopScorersChartTotals = ({ topScorers }) => {
  const playerNames = topScorers.map((player) => player.player_name);
  const playerPoints = topScorers.map((player) => player.PTS);

  const data = {
    labels: playerNames,
    datasets: [
      {
        label: "Total Points",
        data: playerPoints,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: "y", // This line makes the chart horizontal
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
        text: 'Top 20 Scorers per Season',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TopScorersChartTotals;
