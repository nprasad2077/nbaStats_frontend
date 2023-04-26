import React from 'react';
import { Bar } from 'react-chartjs-2';

const Histogram = ({ data }) => {
  const formattedData = data.map((entry) => ({
    range: entry.range,
    count: entry.count,
  }));

  const chartData = {
    labels: formattedData.map((entry) => entry.range),
    datasets: [
      {
        label: 'Count',
        data: formattedData.map((entry) => entry.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Points Range',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
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
