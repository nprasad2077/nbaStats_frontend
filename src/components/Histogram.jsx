import React from "react";
import { Bar } from "react-chartjs-2";

const Histogram = ({ data }) => {
  const formattedData = data
    .map((entry) => ({
      range: entry.range,
      count: entry.count,
    }))
    .sort(
      (a, b) =>
        parseFloat(a.range.split("-")[0]) - parseFloat(b.range.split("-")[0])
    );
  // Here, I've added the .sort() function to the formattedData array to sort the data based on the lower bound of the range. The parseFloat(a.range.split('-')[0]) - parseFloat(b.range.split('-')[0]) expression extracts the lower bound of the range, converts it to a number, and then calculates the difference between the two numbers to determine the sorting order.

  const chartData = {
    labels: formattedData.map((entry) => entry.range),
    datasets: [
      {
        label: "Player PPG",
        data: formattedData.map((entry) => entry.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Points Range",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Histogram;
