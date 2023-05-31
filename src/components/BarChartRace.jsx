import React, { useState, useEffect } from "react";
import ChartRace from "./ChartRace";

const BarChartRace = () => {
  const [cumulativeScores, setCumulativeScores] = useState({});
  const [currentSeason, setCurrentSeason] = useState(2010);

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  const seasons = range(2010, 2023);

  useEffect(() => {
    const fetchSeasonData = async () => {
      const allSeasonsData = [];
      const cumulativeData = {};

      for (const season of seasons) {
        const response = await fetch(
          `https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/${season}`
        );
        const data = await response.json();
        allSeasonsData.push(data.results);

        data.results.forEach((player) => {
          if (cumulativeData[player.player_name]) {
            cumulativeData[player.player_name] += player.PTS;
          } else {
            cumulativeData[player.player_name] = player.PTS;
          }
        });

        setCumulativeScores({ ...cumulativeData });
      }
    };

    fetchSeasonData().catch((error) => console.log(error));
  }, []);

  // Update current season every interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeason((season) => {
        const nextSeasonIndex = seasons.indexOf(season) + 1;
        if (nextSeasonIndex < seasons.length) {
          return seasons[nextSeasonIndex];
        } else {
          clearInterval(interval);
          return season;
        }
      });
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval);
  }, [seasons]);

  console.log(cumulativeScores, currentSeason);

  return (
    <div>
      {Object.keys(cumulativeScores).length > 0 && (
        <ChartRace
          data={Object.entries(cumulativeScores).map(
            ([player_name, value]) => ({
              player_name,
              value,
              color: "steelblue",
            })
          )}
          currentSeason={currentSeason}
        />
      )}
    </div>
  );
};

export default BarChartRace;
