import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

// Components
import Home from "./components/Home.jsx";
import TopScorers from "./components/TopScorers.jsx";
import PointTrend from "./components/PointTrend.jsx";
import TopAssists from "./components/TopAssists.jsx";
import TopRebounds from "./components/TopRebounds.jsx";
import PointsPerGameHistogram from "./components/PointsPerGameHistogram.jsx";
import TopPtsScatterPlot from "./components/TopPtsScatterPlot";
import TopPtsScatterPlotPlayoffs2009 from "./components/TopPtsScatterPlotPlayoffs2009.jsx";
import TopScorersPlayoffs from "./components/TopScorersPlayoffs.jsx";
import TopAssistsPlayoffs from "./components/TopAssistsPlayoffs.jsx";
import TopScorersTotals from "./components/TopScorersTotals.jsx";
import TopAssistsTotals from "./components/TopAssistsTotals.jsx";
import TopReboundsTotals from "./components/TopReboundsTotals.jsx";
import LeBronJamesShotChart from "./components/LeBronJamesShotChart.jsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => {
        setMenuOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  return (
    <div class="bg-gray-100 min-h-screen">
      <div className="navbar bg-base-300" data-theme="winter">
        <div className="container py-2 flex flex-wrap items-center justify-between">
          <Link to="/" className="btn btn-ghost normal-case text-2xl">
            NBA Data Explorer
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
                to="/topscorers_totals"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers
              </Link>
              <Link
                to="/top_pts_scatter_plot"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers vs. Win Shares
              </Link>
              <Link
                to="/topscorers_playoffs"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers {"(playoffs)"}
              </Link>
              <Link
                to="/top_pts_scatter_plot_2009_playoffs"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Scorers vs. Win Shares {"(playoffs)"}
              </Link>

              <Link
                to="/three_two_point_trends"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Shooting Trends
              </Link>
            </div>
            {/* Second row of navbar items */}
            <div className="flex flex-wrap justify-center w-full lg:w-auto mt-2 lg:mt-0">
              {/* Add second row navbar items here */}
              <Link
                to="/lebron_james_shot_chart"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Shot Chart
              </Link>
              <Link
                to="/top_rebounds_totals"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Rebounders
              </Link>
              <Link
                to="/top_assists_totals"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Assists
              </Link>
              <Link
                to="/top_assists_playoffs"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Top Assists {"(playoffs)"}
              </Link>
              <Link
                to="/ppg_histogram"
                className="btn btn-ghost normal-case text-lg mt-2 lg:mt-0 lg:ml-4"
              >
                Points Per Game Histogram
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/topscorers" element={<TopScorers />} />
          <Route path="/topscorers_totals" element={<TopScorersTotals />} />
          <Route path="/topscorers_playoffs" element={<TopScorersPlayoffs />} />
          <Route path="/three_two_point_trends" element={<PointTrend />} />
          <Route path="/top_assists" element={<TopAssists />} />
          <Route path="/top_assists_totals" element={<TopAssistsTotals />} />
          <Route
            path="/top_assists_playoffs"
            element={<TopAssistsPlayoffs />}
          />
          <Route path="/top_rebounds" element={<TopRebounds />} />
          <Route path="/top_rebounds_totals" element={<TopReboundsTotals />} />
          <Route path="/ppg_histogram" element={<PointsPerGameHistogram />} />
          <Route path="/top_pts_scatter_plot" element={<TopPtsScatterPlot />} />

          <Route
            path="/top_pts_scatter_plot_2009_playoffs"
            element={<TopPtsScatterPlotPlayoffs2009 />}
          />
          <Route
            path="/lebron_james_shot_chart"
            element={<LeBronJamesShotChart />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
