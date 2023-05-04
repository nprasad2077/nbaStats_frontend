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
  indexAxis: 'x', // Set the orientation to horizontal
  scales: {
    xAxes: [{
      stacked: true,
      ticks: {
        beginAtZero: true,
      },
    }],
    yAxes: [{
      stacked: true,
      barPercentage: 0.8, // Adjust the space between the y-axis values
      categoryPercentage: 0.5, // Adjust the height of each bar
    }],
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
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1, // Add border width to the bars
        barThickness: 10,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Offensive Rebounds",
        data: playerORB,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderWidth: 1, // Add border width to the bars
        barThickness: 10,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Defensive Rebounds",
        data: playerDRB,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1, // Add border width to the bars
        barThickness: 10,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };
  

  return <Bar options={options} data={data} />;
};

export default TopReboundsDetailedChart;
