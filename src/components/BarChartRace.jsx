import React, { useState, useEffect } from "react";
import ChartRace from "./ChartRace";

const BarChartRace = () => {
  const [topPlayers, setTopPlayers] = useState([]);
  const dummyData = [
    { name: "A", value: 12 },
    { name: "B", value: 16 },
    { name: "C", value: 14 },
    { name: "D", value: 14 },
    { name: "E", value: 32 },
    { name: "F", value: 45 },
    { name: "G", value: 12 },
    // More data...
  ];

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  const seasons = range(2010, 2023);

  useEffect(() => {
    const fetchSeasonData = async () => {
      const allSeasonsData = [];

      for (const season of seasons) {
        const response = await fetch(
          `https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/${season}`
        );
        const data = await response.json();
        allSeasonsData.push(data.results);
      }

      setTopPlayers(allSeasonsData);
    };

    fetchSeasonData().catch((error) => console.log(error));
  }, []);

  console.log(topPlayers);

  return (
    <div>
      <ChartRace data={dummyData} />
    </div>
  );
};

export default BarChartRace;
