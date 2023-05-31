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
      let cumulativeData = {};

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

        // Store the cumulative scores for each season
        setCumulativeScores((prevData) => ({
          ...prevData,
          [season]: { ...cumulativeData },
        }));
      }
    };

    fetchSeasonData().catch((error) => console.log(error));
  }, []);

  const chartData = Object.entries(cumulativeScores[currentSeason] || {}).map(
    ([player_name, value]) => ({
      player_name,
      value,
      color: "steelblue",
    })
  );

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

  return <ChartRace data={chartData} currentSeason={currentSeason} />;
};

export default BarChartRace;
