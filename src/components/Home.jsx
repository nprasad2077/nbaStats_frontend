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
    <div className="text-slate-600 text-center">
      <h1 className="text-3xl font-semibold antialiased mt-4 mb-6 text-center">
        Home
      </h1>
      <div className="overflow-x-auto" data-theme="winter">
        <table className="table w-full text-center">
          {/* head */}
          <thead>
            <tr>
              <th>Database</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Regular Season Data Range</td>
              <td>
                {dbInfo && dbInfo.regular_season_range.season__min - 1}-
                {dbInfo && dbInfo.regular_season_range.season__min} to{" "}
                {dbInfo && dbInfo.regular_season_range.season__max - 1}-
                {dbInfo && dbInfo.regular_season_range.season__max}
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Playoffs Season Data Range</td>
              <td>{dbInfo && dbInfo.playoffs_season_range.season__min - 1}-{dbInfo && dbInfo.playoffs_season_range.season__min} to {dbInfo && dbInfo.playoffs_season_range.season__max - 1}-{dbInfo && dbInfo.playoffs_season_range.season__max}</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Regular Season Total Players</td>
              <td>{dbInfo && dbInfo.total_players_regular}</td>
            </tr>
            {/* row 4 */}
            <tr>
              <td>Playoffs Season Total Players</td>
              <td>{dbInfo && dbInfo.total_players_playoffs}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Home;
