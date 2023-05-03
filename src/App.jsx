import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

// Components
import Home from "./components/Home";
import TopScorers from "./components/topScorers";
import PointTrend from "./components/PointTrend";
import TopAssists from "./components/TopAssists";
import TopRebounds from "./components/TopRebounds";
import PointsPerGameHistogram from "./components/PointsPerGameHistogram";
import TopPtsScatterPlot from "./components/TopPtsScatterPlot";
import TopPtsScatterPlotPlayoffs2009 from "./components/TopPtsScatterPlotPlayoffs2009";
import TopScorersPlayoffs from "./components/TopScorersPlayoffs";
import TopAssistsPlayoffs from "./components/TopAssistsPlayoffs";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div class="bg-gray-100 min-h-screen">
      <div className="navbar bg-base-300" data-theme="winter">
        <div className="container py-2 flex flex-wrap items-center justify-between">
          <Link to="/" className="btn btn-ghost normal-case text-2xl">
            NBA Data
          </Link>
          <button
            className="lg:hidden btn btn-ghost normal-case text-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } lg:flex w-full lg:w-auto flex-wrap`}
          >
            {/* First row of navbar items */}
            <div className="flex flex-wrap lg:justify-start w-full lg:w-auto">
              {/* Add first row navbar items here */}
              <Link
                to="/topscorers"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers
              </Link>
              <Link
                to="/three_two_point_trends"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Shooting Trends
              </Link>
              <Link
                to="/top_assists"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Assists
              </Link>
              <Link
                to="/top_rebounds"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Rebounders
              </Link>
              <Link
                to="/ppg_histogram"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Points Per Game Histogram
              </Link>
              <Link
                to="/top_pts_scatter_plot"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers vs. Win Shares
              </Link>
            </div>
            {/* Second row of navbar items */}
            <div className="flex flex-wrap justify-center w-full lg:w-auto mt-2 lg:mt-0">
              {/* Add second row navbar items here */}

              <Link
                to="/topscorers_playoffs"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers {"(playoffs)"}
              </Link>
              <Link
                to="/top_assists_playoffs"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Assists {"(playoffs)"}
              </Link>
              <Link
                to="/top_pts_scatter_plot_2009_playoffs"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers vs. Win Shares {"(playoffs)"}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/topscorers" element={<TopScorers />} />
          <Route path="/topscorers_playoffs" element={<TopScorersPlayoffs />} />
          <Route path="/three_two_point_trends" element={<PointTrend />} />
          <Route path="/top_assists" element={<TopAssists />} />
          <Route
            path="/top_assists_playoffs"
            element={<TopAssistsPlayoffs />}
          />
          <Route path="/top_rebounds" element={<TopRebounds />} />
          <Route path="/ppg_histogram" element={<PointsPerGameHistogram />} />
          <Route path="/top_pts_scatter_plot" element={<TopPtsScatterPlot />} />

          <Route
            path="/top_pts_scatter_plot_2009_playoffs"
            element={<TopPtsScatterPlotPlayoffs2009 />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
