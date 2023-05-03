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
      <h1 className="text-3xl font-semibold antialiased my-4 text-center">
        Home
      </h1>
      <div className="overflow-x-auto" data-theme="corporate">
        <table className="table w-full">
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
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {dbInfo && (
          <>
            <h4>DB Stats</h4>
            <div class="mt-4">
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
            <div class="mt-4">
              <h5>
                Playoffs Season Data Range:{" "}
                {dbInfo.playoffs_season_range.season__min - 1}-
                {dbInfo.playoffs_season_range.season__min} to{" "}
                {dbInfo.playoffs_season_range.season__max - 1}-
                {dbInfo.playoffs_season_range.season__max} season
              </h5>
              <h4>Playoffs Total Players {dbInfo.total_players_playoffs}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
