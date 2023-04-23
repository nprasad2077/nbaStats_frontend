import React, { useEffect, useState } from "react";

const PointTrend = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/three_two_point_trends/`)
      .then((response) => response.json())
      .then((data) => setPoints(data));
  }, []);

  console.log(points);

  return (
    <div>
      <h1 class="text-3xl font-semibold antialiased text-center mb-4">Point Trends</h1>
    </div>
  );
};

export default PointTrend;
