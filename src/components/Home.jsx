import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [dbInfo, setDbInfo] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://nba-stats-db.herokuapp.com/api/stats/"
      );
      setDbInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-3xl font-semibold antialiased mt-4 text-center text-slate-600">
      <h1>Home</h1>
      <div>
        {dbInfo && (
          <>
            <h4>DB Stats</h4>
            <div class='mt-4'>
              <h5>
                Regular Season Data Range:{" "}
                {dbInfo.regular_season_range.season__min - 1}-
                {dbInfo.regular_season_range.season__min} to{" "}
                {dbInfo.regular_season_range.season__max - 1}-
                {dbInfo.regular_season_range.season__max} season
              </h5>
              <h4>
                Regular Season Total Players {dbInfo.total_players_regular}
              </h4>
            </div>
            <div class='mt-4'>
              <h5>
                Playoffs Season Data Range:{" "}
                {dbInfo.playoffs_season_range.season__min - 1}-
                {dbInfo.playoffs_season_range.season__min} to{" "}
                {dbInfo.playoffs_season_range.season__max - 1}-
                {dbInfo.playoffs_season_range.season__max} season
              </h5>
              <h4>
                Playoffs Total Players {dbInfo.total_players_playoffs}
              </h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
