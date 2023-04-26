import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.css";

// Components
import Home from "./components/Home";
import TopScorers from "./components/topScorers";
import PointTrend from "./components/PointTrend";
import TopAssists from './components/TopAssists'
import TopRebounds from "./components/TopRebounds";

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
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="/topscorers" element={<TopScorers/>} />
        <Route path='/three_two_point_trends' element={<PointTrend />} />
        <Route path='/top_assists' element={<TopAssists />} />
        <Route path='/top_rebounds' element={<TopRebounds />} />
      </Routes>
    </div>
  );
}

export default App;
