import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.css";

// Components
import Home from "./components/Home";
import TopScorers from "./components/topScorers";
import DropDownSeason from './components/DropDownSeason'

function App() {
  return (
    <div>
      <h1 class="text-5xl font-bold underline text-center">NBA Data</h1>

      <nav class='mb-4'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topscorers">Top Scorers</Link>
          </li>
        </ul>
      </nav>

      <div class='mx-auto mt-4'>
        <DropDownSeason />
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="/topscorers" element={<TopScorers/>} />
      </Routes>
    </div>
  );
}

export default App;
