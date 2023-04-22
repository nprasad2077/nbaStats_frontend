import React, { useEffect, useState } from "react";

const PointTrend = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/three_two_point_trends/`)
      .then((response) => response.json())
      .then((data) => setPoints(data));
  }, []);

  console.log(points);

  return <div>PointTrend</div>;
};

export default PointTrend;
