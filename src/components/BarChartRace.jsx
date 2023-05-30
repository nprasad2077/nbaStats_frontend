import React, { useState, useEffect } from "react";
import ChartRace from "./ChartRace";

const BarChartRace = () => {
  const [topPlayers, setTopPlayers] = useState([]);


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

  // Restructure Data

  let restructuredData = []
  for (let i=0;i < topPlayers.length;i++){
    let season = topPlayers[i]

    for(let j=0;j<season.length;j++){
      let player = season[j]
      restructuredData.push({
        name: player.player_name,
        value: player.PTS,
        year: player.season,
      })

    }
  }

  console.log(restructuredData);


  return (
    <div>
      <ChartRace />
    </div>
  );
};

export default BarChartRace;
