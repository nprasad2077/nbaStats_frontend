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
import NavBar from "./components/NavBar";
import BarChartRace from "./components/BarChartRace";

function App() {
  return (
    <div class="bg-gray-100 min-h-screen">
      <NavBar />
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
          <Route path='/bar_chart_race' element={<BarChartRace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
