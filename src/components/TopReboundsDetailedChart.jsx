// TopReboundsDetailedChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const options = {
  indexAxis: 'y', // Set the orientation to horizontal
  scales: {
    x: {
      stacked: false,
      ticks: {
        beginAtZero: true,
      },
    },
    y: {
      stacked: true,
      barPercentage: 0.4, // Adjust the width of each bar
      categoryPercentage: 0.5, // Adjust the space between each group of bars
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
        label: "Total Rebounds",
        data: playerTRB,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(40, 192, 192, 0.2)",
        barThickness: 10,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Offensive Rebounds",
        data: playerORB,
        borderColor: "rgb(255, 206, 0)",
        backgroundColor: "rgba(255, 206, 25, 1.0)",
        barThickness: 10,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Defensive Rebounds",
        data: playerDRB,
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(255, 0, 0, 0.6)",
        barThickness: 10,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };
  

  return <Bar options={options} data={data} />;
};

export default TopReboundsDetailedChart;
