import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.css";

// Components
import Home from "./components/Home";
import TopScorers from "./components/topScorers";
import PointTrend from "./components/PointTrend";
import TopAssists from './components/TopAssists'
import TopRebounds from "./components/TopRebounds";
import PointsPerGameHistogram from "./components/PointsPerGameHistogram";
import TopPtsScatterPlot from "./components/TopPtsScatterPlot";
import TopPtsScatterPlot2018 from "./components/TopPtsScatterPlot2018";
import TopPtsScatterPlotPlayoffs2009 from "./components/TopPtsScatterPlotPlayoffs2009";

function App() {
  return (
    <div class='bg-gray-100 min-h-screen'>
      <h1 class="text-3xl font-bold underline p-4 bg-blue-600 text-white">NBA Data</h1>

      <nav class='p-4 bg-blue-500'>
        <ul class='flex space-x-4'>
          <li>
            <Link to="/" class='text-white'>Home</Link>
          </li>
          <li>
            <Link to="/topscorers" class='text-white'>Top Scorers</Link>
          </li>
          <li>
            <Link to="/three_two_point_trends" class='text-white'>Three Point Shooting Data</Link>
          </li>
          <li>
            <Link to="/top_assists" class='text-white'>Top Assists</Link>
          </li>
          <li>
            <Link to="/top_rebounds" class='text-white'>Top Rebounders</Link>
          </li>
          <li>
            <Link to="/ppg_histogram" class='text-white'>Points Per Game Histogram</Link>
          </li>
          <li>
            <Link to="/top_pts_scatter_plot" class='text-white'>Top PTS Scatter Plot</Link>
          </li>
          <li>
            <Link to="/top_pts_scatter_plot_2018" class='text-white'>Top PTS Scatter Plot since 2018</Link>
          </li>
          <li>
            <Link to="/top_pts_scatter_plot_2009_playoffs" class='text-white'>Playoffs Top Scorers vs. Win Shares since 2009</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="/topscorers" element={<TopScorers/>} />
        <Route path='/three_two_point_trends' element={<PointTrend />} />
        <Route path='/top_assists' element={<TopAssists />} />
        <Route path='/top_rebounds' element={<TopRebounds />} />
        <Route path='/ppg_histogram' element={<PointsPerGameHistogram />} />
        <Route path='/top_pts_scatter_plot' element={<TopPtsScatterPlot />} />
        <Route path='/top_pts_scatter_plot_2018' element={<TopPtsScatterPlot2018 />} />
        <Route path='/top_pts_scatter_plot_2009_playoffs' element={<TopPtsScatterPlotPlayoffs2009 />} />
      </Routes>
    </div>
  );
}

export default App;
