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
    <div className="text-slate-600 text-center p-6 m-auto">
      <h1 className="text-3xl font-semibold antialiased mt-4 mb-6 text-center">
        Home
      </h1>
      <div className="overflow-x-auto w-auto" data-theme="winter">
        <table className="table table-zebra w-full text-center">
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
              <a href="https://www.linkedin.com/in/nikhilrprasad">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a href="https://nikhil.engineer/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 122.88 122.88"
                  className="fill-current"
                >
                  <path d="M0.21,56.33c0-0.2,0.01-0.4,0.05-0.6C1.61,41.05,8.14,27.85,18,18C29.11,6.88,44.47,0,61.44,0c0.65,0,1.3,0.01,1.95,0.03 c0.28-0.03,0.57-0.02,0.86,0.03C80.1,0.78,94.38,7.49,104.88,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-0.53,0.53-1.06,1.05-1.61,1.55c-0.29,0.49-0.71,0.87-1.21,1.09c-10.83,9.55-25.05,15.35-40.63,15.35c-0.41,0-0.82-0.01-1.23-0.01 c-0.19,0.02-0.37,0.01-0.55-0.01c-16.26-0.46-30.93-7.24-41.66-17.97c-0.96-0.96-1.89-1.96-2.79-2.98 c-0.37-0.26-0.66-0.61-0.85-0.99C5.4,90.23,0,76.47,0,61.44C0,59.72,0.07,58.02,0.21,56.33L0.21,56.33z M5.76,54.91 c5.34,3.33,11.06,6,17,8.1c-0.25-10.33-2.27-21.97-6.27-35.06C10.74,35.64,6.93,44.87,5.76,54.91L5.76,54.91z M20.58,23.07 c5.1,15.73,7.51,29.54,7.57,41.67c4.86,1.41,9.84,2.47,14.84,3.2C42.75,64.24,42.7,60.6,42.83,57c0.66-18.43,6.02-35.59,15.9-51.55 c-14.4,0.69-27.38,6.8-36.93,16.35C21.39,22.22,20.98,22.64,20.58,23.07L20.58,23.07z M65.06,5.5 C54.55,21.44,48.85,38.65,48.19,57.19c-0.13,3.75-0.06,7.55,0.22,11.41c4.5,0.45,9,0.66,13.42,0.64c2.15-0.01,4.27-0.07,6.38-0.18 c-0.46-7.15,0.86-14.53,3.66-21.67C76.35,36,84.63,25.17,95.42,16.86C86.89,10.35,76.44,6.23,65.06,5.5L65.06,5.5z M99.62,20.4 c-10.46,7.79-18.48,18.1-22.74,28.96c-2.51,6.41-3.71,12.99-3.3,19.33c18.78-1.72,35.06-7.24,43.49-14.22 c-1.57-12.69-7.39-24.07-15.99-32.66C100.6,21.33,100.11,20.86,99.62,20.4L99.62,20.4z M117.49,60.82 C107.84,67.31,92.08,72.32,74.31,74c0.95,4.39,2.74,8.61,5.49,12.49c4.31,6.09,10.99,11.41,20.44,15.41 c0.28-0.27,0.56-0.54,0.84-0.82c10.14-10.14,16.42-24.16,16.42-39.64C117.49,61.23,117.49,61.03,117.49,60.82L117.49,60.82z M95.74,105.78c-9.16-4.28-15.82-9.85-20.32-16.2c-3.34-4.72-5.47-9.85-6.52-15.18c-2.33,0.13-4.69,0.2-7.07,0.21 c-4.25,0.02-8.57-0.17-12.9-0.57c1.66,13.77,5.9,28.25,12.78,43.45C74.53,117.43,86.33,113.07,95.74,105.78L95.74,105.78z M55.71,117.2c-6.65-15.26-10.71-29.85-12.24-43.79c-5.19-0.71-10.37-1.74-15.45-3.14c-0.64,11.1-3.37,20.71-7.92,29.01 c0.56,0.61,1.13,1.21,1.71,1.79C30.68,109.95,42.52,115.86,55.71,117.2L55.71,117.2z M16.38,94.79c3.74-7.51,5.93-16.16,6.34-26.12 c-6.01-2-11.84-4.55-17.33-7.72c0,0.16,0,0.32,0,0.49C5.39,73.93,9.47,85.47,16.38,94.79L16.38,94.79z"></path>
                </svg>
              </a>
              <a href="mailto:nprasad2077@gmail.com">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4.414 6L12 12.586 19.586 6H4.414zM20 18H4v-7.533l8 5.333 8-5.333V18z"></path>
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
