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
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 1.2,
    },
  },
  responsive: true,
  scales: {
    y: {
      ticks: {
        padding: 0,
      },
      grouped: true, // Enable grouping of bars
    },
    x: {
      barThickness: 0, // Adjust this value to control the thickness of the bars
      minBarLength: 5, // Adjust this value to set the minimum bar length (in pixels)
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top 20 Rebounders by rebounds per game (with ORB & DRB)",
    },
  },
  layout: {
    padding: {
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
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
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        barThickness: 10,
        barPercentage: 0.8, // Controls the width of the bars in each group (relative to category width)
        categoryPercentage: 6, // Controls the width of the bar groups (relative to category width)
      },
      {
        label: "Offensive Rebounds",
        data: playerORB,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        barThickness: 10,
        barPercentage: 0.4, // Controls the width of the bars in each group (relative to category width)
        categoryPercentage: 1, // Controls the width of the bar groups (relative to category width)
      },
      {
        label: "Defensive Rebounds",
        data: playerDRB,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        barThickness: 10,
        barPercentage: 0.4, // Controls the width of the bars in each group (relative to category width)
        categoryPercentage: 1, // Controls the width of the bar groups (relative to category width)
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default TopReboundsDetailedChart;
