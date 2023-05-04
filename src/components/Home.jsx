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
      <div className="overflow-x-auto w-auto" data-theme="winter">
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
              <td>
                {dbInfo && dbInfo.playoffs_season_range.season__min - 1}-
                {dbInfo && dbInfo.playoffs_season_range.season__min} to{" "}
                {dbInfo && dbInfo.playoffs_season_range.season__max - 1}-
                {dbInfo && dbInfo.playoffs_season_range.season__max}
              </td>
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
        <div >
          <footer className="footer items-center p-4 bg-base-300 text-neutral-content" data-theme='winter'>
            <div className="items-center grid-flow-col">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-current"
              >
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
              </svg>
              <p>Copyright © 2023 - All right reserved</p>
            </div>
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
              <a href="https://github.com/nprasad2077/nbaStats_frontend">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
              {/* <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a> */}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
