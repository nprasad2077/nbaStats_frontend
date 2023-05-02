import React, { useEffect, useState, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";

const PointTrend = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch(`https://nba-stats-db.herokuapp.com/api/three_two_point_trends/`)
      .then((response) => response.json())
      .then((data) => setPoints(data));
  }, []);

  const chartDataset3pt = useMemo(() => {
    const labels = points.map((item) => item.season);
    const made = points.map((item) => item.avg_three_made);
    const attempts = points.map((item) => item.avg_three_attempts);

    return {
      labels,
      datasets: [
        {
          label: "3pt FG Made",
          data: made,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "3pt FG Attempts",
          data: attempts,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    };
  }, [points]);

  const chartDataset2pt = useMemo(() => {
    const labels = points.map((item) => item.season);
    const made = points.map((item) => item.avg_two_made);
    const attempts = points.map((item) => item.avg_two_attempts);

    return {
      labels,
      datasets: [
        {
          label: "2pt FG Made",
          data: made,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "2pt FG Attempts",
          data: attempts,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
      ],
    };
  }, [points]);

  const chartDatasetPercentages = useMemo(() => {
    const labels = points.map((item) => item.season);
    const threePtPercentage = points.map(
      (item) => (item.avg_three_made / item.avg_three_attempts) * 100
    );
    const twoPtPercentage = points.map(
      (item) => (item.avg_two_made / item.avg_two_attempts) * 100
    );

    return {
      labels,
      datasets: [
        {
          label: "3pt FG%",
          data: threePtPercentage,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "2pt FG%",
          data: twoPtPercentage,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [points]);

  return (
    <div>
      <h1 className="text-3xl font-semibold antialiased text-center my-4">
        Shooting Trends over NBA Seasons
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold antialiased text-center mb-2">
            3pt Field Goals
          </h2>
          <Line data={chartDataset3pt} />
        </div>
        <div>
          <h2 className="text-xl font-semibold antialiased text-center mb-2">
            2pt Field Goals
          </h2>
          <Line data={chartDataset2pt} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold antialiased text-center mb-4">2pt vs 3pt Field Goal Percentages per Season</h2>
        <Bar data={chartDatasetPercentages} />
      </div>
    </div>
  );
};

export default PointTrend;
