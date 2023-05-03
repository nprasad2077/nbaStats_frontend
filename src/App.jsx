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
  return (
    <div class="bg-gray-100 min-h-screen">
      <div className="navbar bg-base-300" data-theme="winter">
        <Link to="/" className="btn btn-ghost normal-case text-lg">
          NBA Data
        </Link>
        <Link to="/topscorers" className="btn btn-ghost normal-case text-lg">
          Top Scorers
        </Link>
        <Link
          to="/three_two_point_trends"
          className="btn btn-ghost normal-case text-lg"
        >
          Shooting Trends
        </Link>
        <Link to="/top_assists" className="btn btn-ghost normal-case text-lg">
          Top Assists
        </Link>
        <Link to="/top_rebounds" className="btn btn-ghost normal-case text-lg">
          Top Rebounders
        </Link>
        <Link to="/ppg_histogram" className="btn btn-ghost normal-case text-lg">
          Points Per Game Histogram
        </Link>
        <Link
          to="/top_pts_scatter_plot"
          className="btn btn-ghost normal-case text-lg"
        >
          Top Scorers vs. Win Shares
        </Link>
        <Link
          to="/topscorers_playoffs"
          className="btn btn-ghost normal-case text-lg"
        >
          Top Scorers {"(playoffs)"}
        </Link>
        <Link
          to="/top_assists_playoffs"
          className="btn btn-ghost normal-case text-lg"
        >
          Top Assists {"(playoffs)"}
        </Link>
        <Link
          to="/top_pts_scatter_plot_2009_playoffs"
          className="btn btn-ghost normal-case text-lg"
        >
          Top Scorers vs. Win Shares {"(playoffs)"}
        </Link>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/topscorers" element={<TopScorers />} />
        <Route path="/topscorers_playoffs" element={<TopScorersPlayoffs />} />
        <Route path="/three_two_point_trends" element={<PointTrend />} />
        <Route path="/top_assists" element={<TopAssists />} />
        <Route path="/top_assists_playoffs" element={<TopAssistsPlayoffs />} />
        <Route path="/top_rebounds" element={<TopRebounds />} />
        <Route path="/ppg_histogram" element={<PointsPerGameHistogram />} />
        <Route path="/top_pts_scatter_plot" element={<TopPtsScatterPlot />} />

        <Route
          path="/top_pts_scatter_plot_2009_playoffs"
          element={<TopPtsScatterPlotPlayoffs2009 />}
        />
      </Routes>
    </div>
  );
}

export default App;
